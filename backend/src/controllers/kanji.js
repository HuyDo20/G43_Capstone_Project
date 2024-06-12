const { Kanji } = require("../../models");
const { responseWithData } = require("../handlers/response_handler");

async function getAllKanji(req, res) {
	try {
		const kanji = await Kanji.findAll();
		return responseWithData(res, 200, kanji);
	} catch (error) {
		console.error("Error getting all kanji:", error);
		throw error;
	}
}

module.exports = {
	getAllKanji,
};
