const { Kanji } = require("../../models");
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
	KANJI_GET_FAILED,
	KANJI_CREATED,
	KANJI_CREATED_FAILED,
	KANJI_UPDATED_FAILED,
	KANJI_DELETED,
	KANJI_UPDATED,
} = require("../messages/kanji");

async function getAllKanji(req, res) {
	try {
		const kanji = await Kanji.findAll();
		return responseWithData(res, 200, kanji);
	} catch (error) {
		console.error("Error getting all kanji:", error);
		throw error;
	}
}

async function getAllKanjiByDayId(req, res) {
	try {
		const { day_id } = req.query;
		const kanjis = await Kanji.findAll({ where: { day_id } });
		if (kanjis) {
			return responseWithData(res, 200, kanjis);
		} else {
			return badRequest(res, KANJI_GET_FAILED);
		}
	} catch (er) {
		console.error("getAllKanjiByDayId:", error);
		return error(res);
	}
}

async function getKanjiById(req, res) {
	try {
		const { kanji_id } = req.params;
		const kanjis = await Kanji.findAll({ where: { kanji_id } });
		if (kanjis) {
			return responseWithData(res, 200, kanjis);
		} else {
			return badRequest(res, KANJI_GET_FAILED);
		}
	} catch (er) {
		console.error("getKanjiById:", error);
		return error(res);
	}
}

const createNewKanji = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const kanji = await Kanji.create(req.body);
		if (kanji) {
			return created(res, KANJI_CREATED);
		} else {
			return badRequest(res, KANJI_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewKANJI", e);
		return error(res);
	}
};

const updateKanjiById = async (req, res) => {
	try {
		const { accountId } = req;
		const { account_id } = req.body;
		const { kanji_id } = req.params;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const kanji = await Kanji.findOne({
			where: {
				kanji_id,
			},
		});
		if (kanji) {
			const [updatedKanji] = await Kanji.update(req.body, {
				where: { kanji_id },
			});
			if (updatedKanji) {
				return ok(res, KANJI_UPDATED);
			} else {
				return badRequest(res, KANJI_UPDATED_FAILED);
			}
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("updateGrammarById", e);
		return error(res);
	}
};

async function deleteKanjiById(req, res) {
	try {
		const { kanji_id } = req.params;
		const kanji = await Kanji.findOne({ where: { kanji_id } });
		if (!kanji) {
			return notfound(res);
		}
		kanji.kanji_status_id = 3;
		await kanji.save();
		return ok(res, KANJI_DELETED);
	} catch (err) {
		console.error("deleteKanjiById:", err);
		return error(res);
	}
}

module.exports = {
	getAllKanji,
	getAllKanjiByDayId,
	getKanjiById,
	deleteKanjiById,
	createNewKanji,
	updateKanjiById,
};
