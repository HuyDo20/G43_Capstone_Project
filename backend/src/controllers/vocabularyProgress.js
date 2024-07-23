// controllers/vocabularyProgressController.js
const vocabularyProgressService = require('../services/vocabularyProgressService');

const updateVocabularyProgress = async (req, res) => {
  const { userId, vocabularyId } = req.body;
  try {
    const progress = await vocabularyProgressService.updateVocabularyProgress(userId, vocabularyId);
    return res.status(200).json(progress);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAllVocabularyProgress = async (req, res) => {
  const { userId, vocabularyIds } = req.body;
  try {
    const result = await vocabularyProgressService.updateAllVocabularyProgress(userId, vocabularyIds);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserVocabularyProgress = async (req, res) => {
  const { userId } = req.params;
  try {
    const progress = await vocabularyProgressService.getUserVocabularyProgress(userId);
    return res.status(200).json(progress);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateVocabularyProgress,
  updateAllVocabularyProgress,
  getUserVocabularyProgress
};
