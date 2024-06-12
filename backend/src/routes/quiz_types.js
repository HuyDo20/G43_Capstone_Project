const express = require("express");
const { 
    getAllQuizTypes,
    createNewQuizType,
    updateQuizTypeById,
    deleteQuizTypeById,

} = require("../controllers/quiz_types");

const { checkAuthAndRole } = require("../middleware/auth");
const router = express.Router();

router.get("/quiz_types", getAllQuizTypes);
router.post("/quiz_types",checkAuthAndRole([1,3]),createNewQuizType);
router.put("/quiz_type/:quiz_type_id", checkAuthAndRole([1, 2, 3]), updateQuizTypeById);
router.patch("/quiz_type/:quiz_type_id", checkAuthAndRole([1, 2, 3]), deleteQuizTypeById);


module.exports = router;
