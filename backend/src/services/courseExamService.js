const { CourseExam, Course, Exam } = require('../../models');

  async function assignExamToCourse(courseId, examId) {
    const course = await Course.findByPk(courseId);
    const exam = await Exam.findByPk(examId);
    if (!course || !exam) {
      throw new Error('Course or Exam not found');
    }
    const courseExam = await CourseExam.create({ course_id: courseId, exam_id: examId });
    return courseExam;
  }

  async function removeExamFromCourse(courseId, examId) {
    const courseExam = await CourseExam.findOne({
      where: {
        course_id: courseId,
        exam_id: examId,
      },
    });
    if (!courseExam) {
      throw new Error('Exam not assigned to the course');
    }
    await courseExam.destroy();
    return { message: 'Exam removed from course successfully' };
  }

  async function getAllExamsByCourse(courseId) {
    const course = await Course.findByPk(courseId, {
      include: [
        {
          model: Exam,
          through: { attributes: [] },
        },
      ],
    });
    if (!course) {
      throw new Error('Course not found');
    }
    return course.Exams;
  }

  async function getAllCoursesByExam(examId) {
    const exam = await Exam.findByPk(examId, {
      include: [
        {
          model: Course,
          through: { attributes: [] },
        },
      ],
    });
    if (!exam) {
      throw new Error('Exam not found');
    }
    return exam.Courses;
  }


module.exports = {
  assignExamToCourse,
  removeExamFromCourse,
  getAllExamsByCourse,
  getAllCoursesByExam
}
