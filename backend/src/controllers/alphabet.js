const { Alphabet } = require("../../models");
const {
	responseWithData,
	badRequest,
	error,
	created,
	ok,
	notfound,
} = require("../handlers/response_handler");
const {
	ALPHABET_GET_FAILED,
	ALPHABET_CREATED,
	ALPHABET_CREATED_FAILED,
	ALPHABET_UPDATED_FAILED,
	ALPHABET_DELETED,
	ALPHABET_UPDATED,
} = require("../messages/alphabet");

async function getAllAlphabet(req, res) {
	try {
		const alphabets = await Alphabet.findAll();
		return responseWithData(res, 200, alphabets);
	} catch (error) {
		console.error("Error getting all alphabet:", error);
		throw error;
	}
}

async function getAllAlphabetByTypeId(req, res) {
	try {
		const { type_id } = req.params;
		const alphabets = await Alphabet.findAll({ where: { type_id } });
		if (alphabets) {
			return responseWithData(res, 200, alphabets);
		} else {
			return badRequest(res, ALPHABET_GET_FAILED);
		}
	} catch (error) {
		console.error("Error getting all alphabets by type id:", error);
		throw error;
	}
}

module.exports = {
	getAllAlphabet,
	getAllAlphabetByTypeId,
};
