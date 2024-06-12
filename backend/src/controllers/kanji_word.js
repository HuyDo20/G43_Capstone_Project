const { KanjiWord } = require("../../models");
const { responseWithData } = require("../handlers/response_handler");

async function getAllKanjiWord(req, res) {
	try {
		const kanji_words = await KanjiWord.findAll();
		return responseWithData(res, 200, kanji_words);
	} catch (error) {
		console.error("Error getting all kanji words:", error);
		throw error;
	}
}

module.exports = {
	getAllKanjiWord,
};
