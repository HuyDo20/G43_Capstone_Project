const { QuestionType } = require("../../models");
const { responseWithData } = require("../handlers/response_handler");

async function getAllQuestionTypes(req, res) {
	try {
		const question_types = await QuestionType.findAll();
		return responseWithData(res, 200, question_types);
	} catch (error) {
		console.error("Error getting question types:", error);
		throw error;
	}
}

module.exports = {
	getAllQuestionTypes,
};
