const {
	error,
	responseWithData,
	notfound,
	badRequest,
	created,
	forbidden,
	ok,
} = require("../handlers/response_handler");
const { Account } = require("../../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middleware/auth");
const { omitPassword } = require("../helper/user");

const { INVALID_USER_PASSWORD, ACCOUNT_LOGOUT_FAILED, ACCOUNT_LOGIN } = require("../messages/user");

const {
	ACCOUNT_UPDATED,
	ACCOUNT_DELETED,
	ACCOUNT_LOGOUT,
	INVALID_PASSWORD,
	ACCOUNT_EXISTED,
	ACCOUNT_CREATED,
} = require("../messages").userMessages;

async function loginAccount(req, res) {
	try {
		const { email, password } = req.body;

		if (!email && !password) {
			return badRequest(res, INVALID_USER_PASSWORD);
		}

		const user = await Account.findOne({ where: { email: email } });
		if (!user) {
			return notfound(res);
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return badRequest(res, INVALID_PASSWORD);
		}
		let userData = omitPassword(user);
		const token = generateToken(userData, false);
		const refreshToken = generateToken(userData, true);
		user.refresh_token = refreshToken;
		await user.save();
		res.cookie("refresh_token", refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});
		userData.token = token;
		const result = {
			user: userData,
			message: ACCOUNT_LOGIN,
		};
		return responseWithData(res, 200, result);
	} catch (err) {
		console.error("Error during login", err);
		return error(res);
	}
}

async function logoutAccount(req, res) {
	try {
		const { account_id } = req.body;
		const { accountId } = req;
		if (accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}
		const user = await Account.findOne({ where: { account_id } });
		if (!user) {
			return notfound(res);
		}
		const deleteRefreshToken = await Account.update(
			{ refresh_token: null },
			{ where: { account_id } },
		);
		if (deleteRefreshToken) {
			res.clearCookie("refresh_token");
			return ok(res, ACCOUNT_LOGOUT);
		} else {
			return badRequest(res, ACCOUNT_LOGOUT_FAILED);
		}
	} catch (err) {
		console.log("Error during logout", err);
		return error(res);
	}
}

async function registerAccount(req, res) {
	try {
		const { full_name, email, password } = req.body;
		const existingUser = await Account.findOne({
			where: {
				[Op.or]: [{ email: email }],
			},
		});
		if (existingUser) {
			return badRequest(res, ACCOUNT_EXISTED);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await Account.create({
			full_name,
			email,
			password: hashedPassword,
			role_id: 4,
			status_id: 2,
		});
		return ok(res, ACCOUNT_CREATED);
	} catch (err) {
		console.error("Error during registration:", err);
		return error(res);
	}
}

async function getListUser(req, res) {
	try {
		const { page = 1, pageSize = 10, email, full_name } = req.query;

		const where = {
			...(email && { email: { [Op.like]: `%${email}%` } }),
			...(full_name && { full_name: { [Op.like]: `%${full_name}%` } }),
		};

		const limit = parseInt(pageSize);
		const offset = (page - 1) * limit;

		const { count, rows } = await Account.findAndCountAll({
			where,
			limit,
			offset,
			attributes: [
				"account_id",
				"full_name",
				"email",
				"phone_number",
				"dob",
				"avatar",
				"role_id",
				"point",
				"status_id",
			],
		});

		const response = {
			data: rows,
			total_pages: Math.ceil(count / limit),
			current_page: parseInt(page),
		};
		return responseWithData(res, 200, response);
	} catch (err) {
		console.log("Error fetching users:", err);
		return error(res);
	}
}

async function updateUserById(req, res) {
	const { full_name, phone_number, dob, avatar, role_id, point, status_id } = req.body;
	const { account_id } = req.params;
	const { accountRole, accountId } = req;

	try {
		const user = await Account.findOne({ where: { account_id } });
		if (!user) {
			return notfound(res);
		}
		if (accountRole === 1) {
			user.role_id = role_id;
		} else if (accountRole === 2 || accountRole === 3 || accountRole === 4) {
			if (accountId && accountId?.toString() !== account_id?.toString()) {
				return forbidden(res);
			}
		}

		user.full_name = full_name || user.full_name;
		user.dob = dob || user.dob;
		user.phone_number = phone_number || user.phone_number;
		user.avatar = avatar || user.avatar;
		user.point = point || user.point;
		user.status_id = status_id || user.status_id;

		await user.save();
		return ok(res, ACCOUNT_UPDATED);
	} catch (err) {
		console.error("Error updating user:", err);
		return error(res);
	}
}

async function deleteUserById(req, res) {
	try {
		const { account_id } = req.params;
		const user = await Account.findOne({ where: { account_id } });
		if (!user) {
			return notfound(res);
		}
		user.status_id = 3;
		await user.save();
		return ok(res, ACCOUNT_DELETED);
	} catch (err) {
		console.error("Error deactivating user:", err);
		return error(res);
	}
}

async function getUserById(req, res) {
	try {
		const { account_id } = req.params;
		const { accountRole, accountId } = req;

		if (accountRole === 2 || accountRole === 3 || accountRole === 4) {
			if (accountId && accountId?.toString() !== account_id?.toString()) {
				return forbidden(res);
			}
		}

		const user = await Account.findOne({ where: { account_id } });
		if (!user) {
			return notfound(res);
		}
		const userData = omitPassword(user);
		return responseWithData(res, 200, userData);
	} catch (err) {
		console.error("Error fetching user:", error);
		return error(err);
	}
}

async function registerAccountSystem(req, res) {
	try {
		const password = "123456";

		const hashedPassword = await bcrypt.hash(password, 10);

		const userSystem = [
			{
				full_name: "Admin",
				email: "admin@gmail.com",
				password: hashedPassword,
				role_id: 1,
				status_id: 2,
			},
			{
				full_name: "Content Manager",
				email: "cm@gmail.com",
				password: hashedPassword,
				role_id: 2,
				status_id: 2,
			},
			{
				full_name: "Content Creator",
				email: "cc@gmail.com",
				password: hashedPassword,
				role_id: 3,
				status_id: 2,
			},
			{
				full_name: "User",
				email: "user@gmail.com",
				password: hashedPassword,
				role_id: 4,
				status_id: 2,
			},
		];
		userSystem.forEach((user) => {
			Account.create(user);
		});

		return ok(res, ACCOUNT_CREATED);
	} catch (err) {
		console.error("Error during registration:", err);
		return error(res);
	}
}

module.exports = {
	loginAccount,
	registerAccount,
	getListUser,
	updateUserById,
	deleteUserById,
	getUserById,
	registerAccountSystem,
	logoutAccount,
};
