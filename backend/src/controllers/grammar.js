const { Grammar } = require("../../models");
const {
	error,
	forbidden,
	responseWithData,
	notfound,
	created,
	badRequest,
	ok,
} = require("../handlers/response_handler");
const {
	GRAMMAR_GET_FAILED,
	GRAMMAR_CREATED,
	GRAMMAR_CREATED_FAILED,
	GRAMMAR_UPDATED_FAILED,
	GRAMMAR_DELETED,
	GRAMMAR_UPDATED,
} = require("../messages/grammar");

async function getAllGrammarByLessonId(req, res) {
	try {
		const { lesson_id } = req.query;
		const grammars = await Grammar.findAll({ where: { lesson_id } });
		if (grammars) {
			return responseWithData(res, 200, grammars);
		} else {
			return badRequest(res, GRAMMAR_GET_FAILED);
		}
	} catch (er) {
		console.error("getAllGrammarByLessonId:", error);
		return error(res);
	}
}

async function getGrammarById(req, res) {
	try {
		const { grammar_id } = req.params;
		const grammars = await Grammar.findAll({ where: { grammar_id } });
		if (grammars) {
			return responseWithData(res, 200, grammars);
		} else {
			return badRequest(res, GRAMMAR_GET_FAILED);
		}
	} catch (er) {
		console.error("getGrammarById:", error);
		return error(res);
	}
}

const createNewGrammar = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const grammar = await Grammar.create(req.body);
		if (grammar) {
			return created(res, GRAMMAR_CREATED);
		} else {
			return badRequest(res, GRAMMAR_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewGrammar", e);
		return error(res);
	}
};

const updateGrammarById = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id } = req.body;
		const { grammar_id } = req.params;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const grammar = await Grammar.findOne({
			where: {
				grammar_id,
			},
		});
		if (grammar) {
			const [updatedGrammar] = await Grammar.update(req.body, {
				where: { grammar_id },
			});
			if (updatedGrammar) {
				return ok(res, GRAMMAR_UPDATED);
			} else {
				return badRequest(res, GRAMMAR_UPDATED_FAILED);
			}
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("updateGrammarById", e);
		return error(res);
	}
};

async function deleteGrammarById(req, res) {
	try {
		const { grammar_id } = req.params;
		const grammar = await Grammar.findOne({ where: { grammar_id } });
		if (!grammar) {
			return notfound(res);
		}
		grammar.grammar_status_id = 3;
		await grammar.save();
		return ok(res, GRAMMAR_DELETED);
	} catch (err) {
		console.error("deleteGrammarById:", err);
		return error(res);
	}
}

// async function

module.exports = {
	getAllGrammarByLessonId,
	getGrammarById,
	createNewGrammar,
	updateGrammarById,
	deleteGrammarById,
};
