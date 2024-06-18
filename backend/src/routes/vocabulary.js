const express = require("express");
const {
	getAllVocab,
	getVocabById,
	getAllVocabByDayId,
	createNewVocab,
	updateVocabById,
	deleteVocabById,
} = require("../controllers/vocabulary");
const router = express.Router();
const { checkAuthAndRole } = require("../middleware/auth");

router.get("/all_vocabulary", checkAuthAndRole([1, 2, 3, 4]), getAllVocab);
router.get("/vocabulary", checkAuthAndRole([1, 2, 3, 4]), getAllVocabByDayId);
router.get("/vocabulary/:vocab_id", checkAuthAndRole([1, 2, 3, 4]), getVocabById);
router.post("/vocabulary", checkAuthAndRole([1, 3]), createNewVocab);
router.put("/vocabulary/:vocab_id", checkAuthAndRole([1, 2, 3]), updateVocabById);
router.patch("/vocabulary/:vocab_id", checkAuthAndRole([1, 2, 3]), deleteVocabById);

module.exports = router;
