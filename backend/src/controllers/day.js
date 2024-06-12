const { Day } = require("../../models");
const { responseWithData, badRequest, error, forbidden, created, ok } = require("../handlers/response_handler");
const {
	DAY_GET_FAILED,
	DAY_CREATED_FAILED,
	DAY_CREATED,
	DAY_UPDATED,
	DAY_UPDATED_FAILED,
	DAY_DELETED,
} = require("../messages/day");

async function getAllDayByCourseId(req, res) {
	try {
		const { course_id } = req.params;
		const days = await Day.findAll({ where: { course_id } });
		if (days) {
			return responseWithData(res, 200, days);
		} else {
			return badRequest(res, DAY_GET_FAILED);
		}
	} catch (error) {
		console.error("Error getting all days:", error);
		throw error;
	}
}

const createNewDay = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const day = await Day.create(req.body);
		if (day) {
			return created(res, DAY_CREATED);
		} else {
			return badRequest(res, DAY_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewCourse", e);
		return error(res);
	}
};

const updateDayById = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id, day_status_id, day_name, course_id, day_image, day_deadline } = req.body;
		const { day_id } = req.params;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const day = await Day.findOne({
			where: {
				day_id,
			},
		});
		if (day) {
			day.day_status_id = day_status_id;
			day.day_name = day_name || day.day_name;
			day.course_id = course_id || day.course_id;
			day.day_image = day_image || day.day_image;
			day_deadline.day_deadline = day_deadline || day.day_deadline;

			const update = day.save();
			if (update) {
				return ok(res, DAY_UPDATED);
			} else {
				return badRequest(res, DAY_UPDATED_FAILED);
			}
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("updateDayById", e);
		return error(res);
	}
};

async function deleteDayById(req, res) {
	try {
		const { day_id } = req.params;
		const day = await Day.findOne({ where: { day_id } });
		if (!day) {
			return notfound(res);
		}
		day.day_status_id = 3;
		await day.save();
		return ok(res, DAY_DELETED);
	} catch (err) {
		console.error("deleteDayById:", err);
		return error(res);
	}
}

module.exports = {
	getAllDayByCourseId,
	createNewDay,
	updateDayById,
	deleteDayById,
};
