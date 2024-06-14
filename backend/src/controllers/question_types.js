const { QuestionType } = require("../../models");

const {
	responseWithData,
	badRequest,
	error,
	created,
	ok,
	notfound,
} = require("../handlers/response_handler");

const {
	QUESTION_TYPE_GET_FAILED,
	QUESTION_TYPE_CREATED,
	QUESTION_TYPE_CREATED_FAILED,
	QUESTION_TYPE_UPDATED_FAILED,
	QUESTION_TYPE_DELETED,
	QUESTION_TYPE_UPDATED,
} = require("../messages/question_type");
async function getAllQuestionTypes(req, res) {
	try {
		const question_types = await QuestionType.findAll();
		return responseWithData(res, 200, question_types);
	} catch (error) {
		console.error("Error getting question types:", error);
		throw error;
	}
}

async function getQuestionTypeById(req, res) {
	try {
		const { question_type_id } = req.params;
		const question_type = await QuestionType.findAll({ where: { question_types_id } });
		if (question_type) {
			return responseWithData(res, 200, question_type);
		} else {
			return badRequest(res, QUESTION_TYPE_GET_FAILED);
		}
	} catch (er) {
		console.error("get Question By Id:", error);
		return error(res);
	}
}

async function createNewQuestionType(req, res) {
	try {
		const { accountId } = req;
		const { account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const question_types = await QuizType.create(req.body);
		if (quiz) {
			return created(res, QUESTION_TYPE_CREATED);
		} else {
			return badRequest(res, QUESTION_TYPE_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewQuizType", e);
		return error(res);
	}
}

module.exports = {
	getAllQuestionTypes,
	getQuestionTypeById,
	createNewQuestionType,
};
