// services/vocabularyProgressService.js
const db = require('../../models');
const VocabularyProgress = db.VocabularyProgress;

const updateVocabularyProgress = async (userId, vocabularyId) => {
  let progress = await VocabularyProgress.findOne({
    where: { user_id: userId, vocabulary_id: vocabularyId }
  });

  if (progress) {
    progress.learned = true;
    await progress.save();
  } else {
    progress = await VocabularyProgress.create({
      user_id: userId,
      vocabulary_id: vocabularyId,
      learned: true
    });
  }

  return progress;
};

const updateAllVocabularyProgress = async (userId, vocabularyIds) => {
  for (const vocabularyId of vocabularyIds) {
    await updateVocabularyProgress(userId, vocabularyId);
  }
  return { message: 'All vocabulary marked as complete' };
};

const getUserVocabularyProgress = async (userId) => {
  const progress = await VocabularyProgress.findAll({
    where: { user_id: userId }
  });
  return progress;
};

module.exports = {
  updateVocabularyProgress,
  updateAllVocabularyProgress,
  getUserVocabularyProgress
};
