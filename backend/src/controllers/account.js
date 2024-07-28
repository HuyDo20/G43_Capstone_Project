const {
	error,
	responseWithData,
	notfound,
	badRequest,
	created,
	forbidden,
	ok,
} = require("../handlers/response_handler");
const { Account, Otp } = require("../../models");
const { Notification } = require("../../models")
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middleware/auth");
const { omitPassword } = require("../helper/user");
const RANDOM_OTP_CHARACTER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const { INVALID_USER_PASSWORD, ACCOUNT_LOGOUT_FAILED, ACCOUNT_LOGIN, OTP_GENERATED, OTP_EXPIRED, OTP_INVALID } = require("../messages/user");

const {
	ACCOUNT_UPDATED,
	ACCOUNT_DELETED,
	ACCOUNT_LOGOUT,
	INVALID_PASSWORD,
	ACCOUNT_EXISTED,
	ACCOUNT_CREATED,
	ACCOUNT_DEACTIVE,
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
		if (user.status_id !== 2) {
			//Status của hệ thống: 1 :pending, 2: active, 3: deactive, 
			return forbidden(res, ACCOUNT_DEACTIVE);
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return badRequest(res, INVALID_PASSWORD);
		}
		
		// lay thong tin user 
		let userData = omitPassword(user);

		// update token moi cho user
		const token = generateToken(userData, false);
		const refreshToken = generateToken(userData, true);
		user.refresh_token = refreshToken;
		await user.save();
		
		// tao data de tra ve
		res.cookie("refresh_token", refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});
		userData.token = token;
		const result = {
			data: userData,
			message: ACCOUNT_LOGIN,
		};

		// tra data 
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
		const { full_name,email,password } = req.body;
		const existingUser = await Account.findOne({
			where: {
				[Op.or]: [{ email: email }],
			},
		});
		if (existingUser) {
			return responseWithData(res,202, ACCOUNT_EXISTED);
		}
		await createOtp(email);
		return ok(res, OTP_GENERATED);
	} catch (err) {
		console.error("Error during registration:", err);
		return error(res);
	}
}

async function verifyOtp(req, res) {
    try {
        const { email, otp, full_name, password } = req.body; 

        // Find OTP record matching the provided email and otp_code
        let userVerifying = await Otp.findOne({ where: { email: email, otp_code: otp } });

        if (userVerifying === null) {
            // OTP does not exist or is incorrect
            console.log(OTP_INVALID);
            return responseWithData(res,202, OTP_INVALID);
        }

        // Check if the OTP has expired
        const currentDate = new Date();
        if (currentDate > userVerifying.expires_at) {
            // OTP is expired
            console.log(OTP_EXPIRED);
            return responseWithData(res, 202,OTP_EXPIRED);
        }
        // Hash the user's password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user account
        await Account.create({
            full_name,
            email,
            password: hashedPassword,
            role_id: 4, // Adjust role_id as necessary
            status_id: 2, // Adjust status_id as necessary
        });

        // Return success response
        return ok(res, ACCOUNT_CREATED);
        
    } catch (err) {
        console.error("Error during OTP verification:", err);
        return error(res);
    }
}

async function resendOtp(req, res) {
    try {
        const { email } = req.body; 
        // Find OTP record matching the provided email and otp_code
		await createOtp(email);
        // Return success response
        return ok(res, OTP_GENERATED);
    } catch (err) {
        console.error("Error during OTP verification:", err);
        return error(res);
    }
}

async function createOtp(email){
if(email === null)
	return;
//create otp code
let otp = getOtp();
//expire in 60s
let expireTime = getExpirationDate(60);
//delete exit email otp
await Otp.destroy({ where: { email: email } });
//create otp in database
return await Otp.create({
email: email,
otp_code: otp,
expires_at: expireTime
});
}
function getOtp() {
	let result = '';
	for (let i = 0; i < 6; i++) {
	  result += RANDOM_OTP_CHARACTER.charAt(Math.floor(Math.random() * RANDOM_OTP_CHARACTER.length));
	}
	return result;
  }

  function getExpirationDate(seconds) {
	const currentDate = new Date();
	currentDate.setSeconds(currentDate.getSeconds() + seconds);
	return currentDate;
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


async function createUser(req, res) {
	try {
	  const { full_name, email, password, phone_number, dob, avatar, role_id, point, status_id } = req.body;
  
	  // Check if the account already exists
	  const existingUser = await Account.findOne({
		where: {
		  [Op.or]: [{ email: email }],
		},
	  });
  
	  if (existingUser) {
		return badRequest(res, ACCOUNT_EXISTED);
	  }
	  // Hash the password
	  const hashedPassword = await bcrypt.hash(password, 10);
	  // Create the new account
	  const newAccount = await Account.create({
		full_name,
		email,
		password: hashedPassword,
		phone_number,
		dob,
		avatar,
		role_id: role_id || 4, 
		point: point || 0, 
		status_id: status_id || 2, 
	  });
  
	  return created(res, ACCOUNT_CREATED, newAccount);
	} catch (err) {
	  console.error("Error during account creation:", err);
	  return error(res);
	}
  }

async function updateUserById(req, res) {
	const { full_name, phone_number, dob, avatar, role_id, point, status_id, password } = req.body;
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
		let hashedPassword;
		if (password) {
			hashedPassword = await bcrypt.hash(password, 10);
		}

		user.full_name = full_name || user.full_name;
		user.dob = dob || user.dob;
		user.phone_number = phone_number || user.phone_number;
		user.avatar = avatar || user.avatar;
		user.point = point || user.point;
		user.status_id = status_id || user.status_id;
		user.password = hashedPassword || user.password;

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
	createUser,
	updateUserById,
	deleteUserById,
	getUserById,
	registerAccountSystem,
	logoutAccount,verifyOtp,resendOtp

};
