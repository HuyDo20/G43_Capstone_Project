const express = require("express");
const {
	getAllQuiz,
	getQuizById,
	getAllQuizByDayId,
	createNewQuiz,
	updateQuizById,
	deleteQuizById,
} = require("../controllers/quiz");

const { checkAuthAndRole } = require("../middleware/auth");
const router = express.Router();

router.get("/quiz", getAllQuiz);
router.get("/quiz", checkAuthAndRole([1, 2, 3, 4]), getAllQuizByDayId);
router.get("/quiz/:quiz_id", checkAuthAndRole([1, 2, 3, 4]), getQuizById);
router.post("/quiz", checkAuthAndRole([1, 3]), createNewQuiz);
router.put("/quiz/:quiz_id", checkAuthAndRole([1, 2, 3]), updateQuizById);
router.patch("/quiz/:quiz_id", checkAuthAndRole([1, 2, 3]), deleteQuizById);

module.exports = router;
