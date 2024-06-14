const express = require("express");
const { 
	getAllQuestionTypes,
	getQuestionTypeById, 
	createNewQuestionType,
	updateQuestionTypeById 
} = require("../controllers/question_types");
const router = express.Router();

const { checkAuthAndRole } = require("../middleware/auth");
const { updateQuestionTypeById } = require("../controllers/question_types");

router.get("/question_type", getAllQuestionTypes);
router.get("/question_type/:question_type_id", checkAuthAndRole([1, 2, 3, 4]), getQuestionTypeById);
router.post("/question_type", checkAuthAndRole([1, 3]), createNewQuestionType);
router.put("/question_type/:question_type_id", checkAuthAndRole([1, 3]),updateQuestionTypeById);

module.exports = router;
