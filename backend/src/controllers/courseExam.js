const {  assignExamToCourse,
  removeExamFromCourse,
  getAllExamsByCourse,
  getAllCoursesByExam} = require('../services/courseExamService');
const { ok, badRequest, notfound, error } = require('../handlers/response_handler');

class CourseExamController {
 async   assignExamToCourse(req, res) {
   try {
     const { course_id, exam_id } = req.body;
     if (course_id === null || exam_id === null) {
       console.log("is null");
     }
     const courseExam = await assignExamToCourse(course_id, exam_id);
      return ok(res, courseExam);
    } catch (err) {
      return badRequest(res, err.message);
    }
  }

  async  removeExamFromCourse(req, res) {
    try {
      const result = await removeExamFromCourse(req.params.courseId, req.params.examId);
      return ok(res, result);
    } catch (err) {
      return badRequest(res, err.message);
    }
  }

  async  getAllExamsByCourse(req, res) {
    try {
      const exams = await getAllExamsByCourse(req.params.courseId);
      return ok(res, exams);
    } catch (err) {
      return notfound(res, err.message);
    }
  }

  async  getAllCoursesByExam(req, res) {
    try {
      const courses = await getAllCoursesByExam(req.params.examId);
      return ok(res, courses);
    } catch (err) {
      return notfound(res, err.message);
    }
  }
}
  
module.exports = new CourseExamController;

