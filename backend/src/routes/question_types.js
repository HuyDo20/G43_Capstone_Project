const express = require("express");
const { getAllQuestionTypes, getQuestionTypeById, createNewQuestionType } =
	require("../controllers").question_types;
const router = express.Router();

const { checkAuthAndRole } = require("../middleware/auth");

router.get("/question_types", getAllQuestionTypes);
router.get("/question_types/:question_type_id", getQuestionTypeById);
router.post("/question_types", checkAuthAndRole([1, 3]), createNewQuestionType);

module.exports = router;
