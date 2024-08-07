const { ExamHistory, Exam, Account } = require('../../models');

async function createExamHistory(examHistoryData) {
  const examHistory = await ExamHistory.create(examHistoryData);
  return examHistory;
}

async function getAllExamHistories() {
  const examHistories = await ExamHistory.findAll();
  return examHistories;
}

async function getExamHistoryById(examHistoryId) {
  const examHistory = await ExamHistory.findByPk(examHistoryId);
  if (!examHistory) {
    throw new Error('ExamHistory not found');
  }
  return examHistory;
}

async function updateExamHistory(examHistoryId, updatedData) {
  const examHistory = await ExamHistory.findByPk(examHistoryId);
  if (!examHistory) {
    throw new Error('ExamHistory not found');
  }
  await examHistory.update(updatedData);
  return examHistory;
}

async function deleteExamHistory(examHistoryId) {
  const examHistory = await ExamHistory.findByPk(examHistoryId);
  if (!examHistory) {
    throw new Error('ExamHistory not found');
  }
  await examHistory.destroy();
  return examHistory;
}

module.exports = {
  createExamHistory,
  getAllExamHistories,
  getExamHistoryById,
  updateExamHistory,
  deleteExamHistory,
};
