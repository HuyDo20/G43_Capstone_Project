const express = require("express");
const {
	getAllVocab,
	getVocabById,
	getAllVocabByDayId,
	createNewVocab,
	updateVocabById,
	deleteVocabById,
} = require("../controllers/vocabulary");
const vocabularyProgressController = require('../controllers/vocabularyProgress');
const router = express.Router();
const { checkAuthAndRole } = require("../middleware/auth");

router.get("/all_vocabulary", checkAuthAndRole([1, 2, 3, 4]), getAllVocab);
router.get("/vocabulary", checkAuthAndRole([1, 2, 3, 4]), getAllVocabByDayId);
router.get("/vocabulary/:vocab_id", checkAuthAndRole([1, 2, 3, 4]), getVocabById);
router.post("/vocabulary", checkAuthAndRole([1, 3]), createNewVocab);
router.put("/vocabulary/:vocab_id", checkAuthAndRole([1, 2, 3]), updateVocabById);
router.patch("/vocabulary/:vocab_id", checkAuthAndRole([1, 2, 3]), deleteVocabById);

router.post('/update', vocabularyProgressController.updateVocabularyProgress);
router.get('/user/:userId', vocabularyProgressController.getUserVocabularyProgress);
router.post('/update-all', vocabularyProgressController.updateAllVocabularyProgress); 

module.exports = router;
