const { Vocabulary } = require("../../models");
const {
	responseWithData,
	badRequest,
	error,
	created,
	ok,
	notfound,
} = require("../handlers/response_handler");

const {
	VOCABULARY_GET_FAILED,
	VOCABULARY_CREATED,
	VOCABULARY_CREATED_FAILED,
	VOCABULARY_UPDATED_FAILED,
	VOCABULARY_UPDATED,
	VOCABULARY_DELETED,
} = require("../messages/vocabulary");

async function getAllVocab(req, res) {
	try {
		const vocabs = await Vocabulary.findAll();
		return responseWithData(res, 200, vocabs);
	} catch (error) {
		console.error("Error getting all vocabulary:", error);
		throw error;
	}
}

async function getVocabById(req, res) {
	try {
		const { vocab_id } = req.query;
		const vocabs = await Vocabulary.findAll({ where: { vocab_id } });
		if (vocabs) {
			return responseWithData(res, 200, vocabs);
		} else {
			return badRequest(res, VOCABULARY_GET_FAILED);
		}
	} catch (er) {
		console.error("getVocabById:", error);
		return error(res);
	}
}

async function getAllVocabByDayId(req, res) {
	try {
		const { day_id } = req.query;
		const vocabs = await Vocabulary.findAll({ where: { day_id } });
		if (vocabs) {
			return responseWithData(res, 200, vocabs);
		} else {
			return badRequest(res, VOCABULARY_GET_FAILED);
		}
	} catch (er) {
		console.error("getAllVocabByDayId:", error);
		return error(res);
	}
}

async function createNewVocab(req, res) {
	try {
		const { accountId } = req;
		const { account_id } = req.body;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const vocab = await Vocabulary.create(req.body);
		if (vocab) {
			return responseWithData(res, 201, {
				data: vocab,
				message: VOCABULARY_CREATED,
			});
		} else {
			return badRequest(res, VOCABULARY_CREATED_FAILED);
		}
	} catch (e) {
		console.log("createNewVocabulary", e);
		return error(res);
	}
}

async function updateVocabById(req, res) {
	try {
		const { accountId } = req;
		const { account_id } = req.body;
		const { vocab_id } = req.params;

		if (accountId && accountId?.toString() !== account_id?.toString()) {
			return forbidden(res);
		}

		const vocab = await Vocabulary.findOne({
			where: {
				vocab_id,
			},
		});
		if (vocab) {
			const [updatedVocab] = await Vocabulary.update(req.body, {
				where: { vocab_id },
			});
			if (updatedVocab) {
				return ok(res, VOCABULARY_UPDATED);
			} else {
				return badRequest(res, VOCABULARY_UPDATED_FAILED);
			}
		} else {
			return notfound(res);
		}
	} catch (e) {
		console.log("updateVocabById", e);
		return error(res);
	}
}

async function deleteVocabById(req, res) {
	try {
		const { vocab_id } = req.params;
		const vocab = await Vocabulary.findOne({ where: { vocab_id } });
		if (!vocab) {
			return notfound(res);
		}
		vocab.vocab_status_id = 3;
		await vocab.save();
		return ok(res, VOCABULARY_DELETED);
	} catch (err) {
		console.error("deleteVocabById:", err);
		return error(res);
	}
}

async function generatePracticeData(req, res) {
    try {
        const { vocabularyIds } = req.body;
        // Fetch vocabulary entries from the database
        const vocabEntries = await Vocabulary.findAll({
            where: { vocab_id: vocabularyIds }
        });
        // Generate a single question for each vocabulary entry, alternating between Kanji and meaning
        const questions = vocabEntries.map((vocab, index) => {
            return index % 2 === 0 ?
                createKanjiQuestion(vocab, vocabEntries) :
                createMeaningQuestion(vocab, vocabEntries);
		}).filter(question => question); 
        // Return the questions with a successful HTTP status
        return responseWithData(res, 200, questions);
    } catch (error) {
        console.error("Error generating practice data:", error);
        return responseWithError(res, 500, "Failed to generate practice data");
    }
}

function createKanjiQuestion(vocab, allVocabs) {
    const validDistractors = allVocabs.filter(item => item.vocab_id !== vocab.vocab_id && item.vocab_kanji && item.vocab_kanji.trim() !== '');
    const options = generateOptions(vocab, validDistractors, 'kanji');

    if (!options || options.length < 4) return null;

    return {
        question: `Chọn Kanji tương ứng với nghĩa "${vocab.vocab_meaning}"?`,
        options: options,
        correctAnswer: vocab.vocab_kanji
    };
}

function createMeaningQuestion(vocab, allVocabs) {
    const validDistractors = allVocabs.filter(item => item.vocab_id !== vocab.vocab_id && item.vocab_meaning && item.vocab_meaning.trim() !== '');
    const options = generateOptions(vocab, validDistractors, 'meaning');

    if (!options || options.length < 4) return null;

    return {
        question: `Chọn nghĩa của từ "${vocab.vocab_name}"?`,
        options: options,
        correctAnswer: vocab.vocab_meaning
    };
}

function generateOptions(correctVocab, distractors, type) {
    const correctOption = type === 'kanji' ? correctVocab.vocab_kanji : correctVocab.vocab_meaning;
    const wrongOptions = distractors
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(item => (type === 'kanji' ? item.vocab_kanji : item.vocab_meaning))
        .filter(option => option && option.trim() !== '');

    if (!correctOption || correctOption.trim() === '') {
        return [];
    }

    const options = [correctOption, ...wrongOptions].sort(() => 0.5 - Math.random());
    return options;
}

module.exports = {
	getAllVocab,
	getVocabById,
	createNewVocab,
	getAllVocabByDayId,
	updateVocabById,
	deleteVocabById,
	generatePracticeData
};
