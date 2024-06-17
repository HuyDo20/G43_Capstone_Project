const express = require("express");
const {
	getAllQuestionTypes,
	getQuestionTypeById,
	createNewQuestionType,
	updateQuestionTypeById,
	deleteQuestionTypeById,
} = require("../controllers/question_types");
const router = express.Router();

const { checkAuthAndRole } = require("../middleware/auth");

router.get("/question_types", getAllQuestionTypes);
router.get(
	"/question_types/:question_type_id",
	checkAuthAndRole([1, 2, 3, 4]),
	getQuestionTypeById,
);
router.post("/question_types", checkAuthAndRole([1, 3]), createNewQuestionType);
router.put("/question_types/:question_type_id", checkAuthAndRole([1, 3]), updateQuestionTypeById);
router.patch("/question_types/:question_type_id", checkAuthAndRole([1, 3]), deleteQuestionTypeById);
module.exports = router;
