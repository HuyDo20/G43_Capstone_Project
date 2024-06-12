const express = require("express");
const {
	getGrammarById,
	createNewGrammar,
	updateGrammarById,
	deleteGrammarById,
} = require("../controllers/grammar");
const { checkAuthAndRole } = require("../middleware/auth");
const { getAllGrammarByLessonId } = require("../controllers").grammar;
const router = express.Router();

router.get("/grammar", checkAuthAndRole([1, 2, 3, 4]), getAllGrammarByLessonId);
router.get("/grammar/:grammar_id", checkAuthAndRole([1, 2, 3, 4]), getGrammarById);
router.post("/grammar", checkAuthAndRole([1, 3]), createNewGrammar);
router.put("/grammar/:grammar_id", checkAuthAndRole([1, 2, 3]), updateGrammarById);
router.patch("/grammar/:grammar_id", checkAuthAndRole([1, 2, 3]), deleteGrammarById);

module.exports = router;
