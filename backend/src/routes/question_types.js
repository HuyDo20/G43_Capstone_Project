const express = require("express");
const { getAllQuestionTypes, login } = require("../controllers").question_types;
const router = express.Router();

router.get("/question_types", getAllQuestionTypes);

module.exports = router;
