const {
	error,
	forbidden,
	responseWithData,
	notfound,
	created,
	badRequest,
	ok,
} = require("../handlers/response_handler");
const { Course } = require("../../models");
const {
	COURSE_GET_FAILED,
	COURSE_CREATED,
	COURSE_CREATED_FAILED,
	COURSE_UPDATED,
	COURSE_UPDATED_FAILED,
	COURSE_DELETED,
} = require("../messages/course");

const getAllCourse = async (req, res) => {
	try {
		const course = await Course.findAll();
		if (course) {
			return responseWithData(res, 200, course);
		} else {
			return badRequest(res, COURSE_GET_FAILED);
		}
	} catch (e) {
		console.log("getAllCourse", e);
		return error(res);
	}
};

const getCourseById = async (req, res) => {
	try {
		const { course_id } = req.params;

		const course = await Course.findOne({
			where: {
				course_id,
			},
		});
		if (course) {
			return responseWithData(res, 200, course);
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("getCourseById", e);
		return error(res);
	}
};

const createNewCourse = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const course = await Course.create(req.body);
		if (course) {
			return created(res, COURSE_CREATED);
		} else {
			return badRequest(res, COURSE_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewCourse", e);
		return error(res);
	}
};

const updateCourseById = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id, course_status_id } = req.body;
		const { course_id } = req.params;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const course = await Course.findOne({
			where: {
				course_id,
			},
		});
		if (course) {
			const [update] = await Course.update({
				where: {
					course_id,
				},
			});
			if (update) {
				return ok(res, COURSE_UPDATED);
			} else {
				return badRequest(res, COURSE_UPDATED_FAILED);
			}
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("updateCourseById", e);
		return error(res);
	}
};

async function deleteCourseById(req, res) {
	try {
		const { course_id } = req.params;
		const course = await Course.findOne({ where: { course_id } });
		if (!course) {
			return notfound(res);
		}
		course.course_status_id = 3;
		await course.save();
		return ok(res, COURSE_DELETED);
	} catch (err) {
		console.error("Error deactivating course:", err);
		return error(res);
	}
}

module.exports = {
	getAllCourse,
	createNewCourse,
	updateCourseById,
	getCourseById,
	deleteCourseById,
};
