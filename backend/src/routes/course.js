const express = require("express");
const {
	getAllCourse,
	getCourseById,
	createNewCourse,
	updateCourseById,
	deleteCourseById,
	getCourseDetailById,
	updateCourseDetail,
} = require("../controllers/course");
const { checkAuthAndRole } = require("../middleware/auth");
const router = express.Router();

router.get("/all_course", checkAuthAndRole([1, 2, 3, 4]), getAllCourse);
router.get("/course/:course_id", checkAuthAndRole([1, 2, 3, 4]), getCourseById);
router.post("/course", checkAuthAndRole([1, 3]), createNewCourse);
router.put("/course/:course_id", checkAuthAndRole([1, 2, 3]), updateCourseById);
router.patch("/course/:course_id", checkAuthAndRole([1, 2, 3]), deleteCourseById);
router.get("/course-detail/:course_id", checkAuthAndRole([1, 2, 3, 4]), getCourseDetailById);
router.put("/course-detail", checkAuthAndRole([1, 2, 3]), updateCourseDetail);

module.exports = router;
