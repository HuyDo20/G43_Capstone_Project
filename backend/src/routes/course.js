const express = require("express");
const {
	getAllCourse,
	getCourseById,
	createNewCourse,
	updateCourseById,
	deleteCourseById,
} = require("../controllers/course");
const { checkAuthAndRole } = require("../middleware/auth");
const router = express.Router();

router.get("/course", getAllCourse);
router.get("/course/:course_id", getCourseById);
router.post("/course", checkAuthAndRole([1, 3]), createNewCourse);
router.put("/course/:course_id", checkAuthAndRole([1, 2, 3]), updateCourseById);
router.patch("/course/:course_id", checkAuthAndRole([1, 2, 3]), deleteCourseById);

module.exports = router;
