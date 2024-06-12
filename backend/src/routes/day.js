const express = require("express");
const {
	getAllDayByCourseId,
	createNewDay,
	updateDayById,
	deleteDayById,
} = require("../controllers/day");
const { checkAuthAndRole } = require("../middleware/auth");
const router = express.Router();

router.get("/day/:course_id", checkAuthAndRole([1, 2, 3, 4]), getAllDayByCourseId);
router.post("/day", checkAuthAndRole([1, 3]), createNewDay);
router.put("/day/:day_id", checkAuthAndRole([1, 2, 3]), updateDayById);
router.patch("/day/:day_id", checkAuthAndRole([1, 2, 3]), deleteDayById);

module.exports = router;
