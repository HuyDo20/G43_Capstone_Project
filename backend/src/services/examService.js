const { Exam, Course, CourseExam } = require('../../models');


  async function createExam(examData) {
    const exam = await Exam.create(examData);
    return exam;
  }

  async function getAllExams() {
    const exams = await Exam.findAll();
    return exams;
  }

  async function getExamById(examId) {
    const exam = await Exam.findByPk(examId);
    if (!exam) {
      throw new Error('Exam not found');
    }
    return exam;
  }

  async function updateExam(examId, updatedData) {
    const exam = await Exam.findByPk(examId);
    if (!exam) {
      throw new Error('Exam not found');
    }
    await exam.update(updatedData);
    return exam;
  }

  async function deleteExam(examId) {
    const exam = await Exam.findByPk(examId);
    if (!exam) {
      throw new Error('Exam not found');
    }
    await exam.destroy();
    return exam;
  }

  async function assignExamToCourse(examId, courseId) {
    const exam = await Exam.findByPk(examId);
    const course = await Course.findByPk(courseId);
    if (!exam || !course) {
      throw new Error('Exam or Course not found');
    }
    await CourseExam.create({ exam_id: examId, course_id: courseId });
    return { message: 'Exam assigned to course successfully' };
  }

  async function removeExamFromCourse(examId, courseId) {
    const courseExam = await CourseExam.findOne({
      where: {
        exam_id: examId,
        course_id: courseId,
      },
    });
    if (!courseExam) {
      throw new Error('Exam not assigned to the course');
    }
    await courseExam.destroy();
    return { message: 'Exam removed from course successfully' };
  }


module.exports = {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam,
  assignExamToCourse,
  removeExamFromCourse
}
