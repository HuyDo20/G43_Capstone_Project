const express = require("express");
const {
	getAllQuizTypes,
	createNewQuizType,
	updateQuizTypeById,
	deleteQuizTypeById,
	getQuizTypeById,
} = require("../controllers/quiz_types");

const { checkAuthAndRole } = require("../middleware/auth");
const router = express.Router();

router.get("/quiz_type", getAllQuizTypes);
router.get("/quiz_type/:quiz_type_id", checkAuthAndRole([1, 2, 3, 4]), getQuizTypeById);
router.post("/quiz_type", checkAuthAndRole([1, 3]), createNewQuizType); // postman : khong duoc phep truy cap
router.put("/quiz_type/:quiz_type_id", checkAuthAndRole([1, 2, 3]), updateQuizTypeById); // postman : khong duoc phep truy cap
router.patch("/quiz_type/:quiz_type_id", checkAuthAndRole([1, 2, 3]), deleteQuizTypeById);

module.exports = router;
