const {
  createExamHistory,
  getAllExamHistories,
  getExamHistoryById,
  updateExamHistory,
  deleteExamHistory,
} = require('../services/examHistoryService');
const { ok, created, badRequest, notfound, error } = require('../handlers/response_handler');

class ExamHistoryController {
  async createExamHistory(req, res) {
    try {
      const examHistory = await createExamHistory(req.body);
      return created(res, examHistory);
    } catch (err) {
      console.log(err);
      return badRequest(res, err.message);
    }
  }

  async getAllExamHistories(req, res) {
    try {
      const examHistories = await getAllExamHistories();
      return ok(res, examHistories);
    } catch (err) {
      return error(res, err.message);
    }
  }

  async getExamHistoryById(req, res) {
    try {
      const { exam_history_id } = req.params;
      const examHistory = await getExamHistoryById(exam_history_id);
      if (!examHistory) {
        return notfound(res, 'ExamHistory not found');
      }
      return ok(res, examHistory);
    } catch (err) {
      return notfound(res, err.message);
    }
  }

  async updateExamHistory(req, res) {
    try {
      const examHistory = await updateExamHistory(req.params.examHistoryId, req.body);
      if (!examHistory) {
        return notfound(res, 'ExamHistory not found');
      }
      return ok(res, examHistory);
    } catch (err) {
      return badRequest(res, err.message);
    }
  }

  async deleteExamHistory(req, res) {
    try {
      const examHistory = await deleteExamHistory(req.params.examHistoryId);
      if (!examHistory) {
        return notfound(res, 'ExamHistory not found');
      }
      return ok(res, 'ExamHistory deleted successfully');
    } catch (err) {
      return badRequest(res, err.message);
    }
  }
}

module.exports = new ExamHistoryController();
