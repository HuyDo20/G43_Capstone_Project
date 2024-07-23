// services/vocabularyProgressService.js
const { VocabularyProgress } = require('../../models');

const updateVocabularyProgress = async (accountId, vocabularyId) => {
  console.log("try to update: " + accountId + vocabularyId);
  try {
    let progress = await VocabularyProgress.findOne({
      where: { account_id: accountId, vocabulary_id: vocabularyId }
    });
    console.log("Find result: ", progress);

    if (progress) {
      progress.learned = true;
      await progress.save();
      console.log("Updated progress: ", progress);
    } else {
      console.log("Creating new progress entry");
      progress = await VocabularyProgress.create({
        account_id: accountId,
        vocabulary_id: vocabularyId,
        learned: true
      });
      console.log("Created progress: ", progress);
    }
    return progress;
  } catch (error) {
    console.error("Error updating/creating progress: ", error);
    throw error;
  }
};

const updateAllVocabularyProgress = async (accountId, vocabularyIds) => {
  try {
    for (const vocabularyId of vocabularyIds) {
      await updateVocabularyProgress(accountId, vocabularyId);
    }
    return { message: 'All vocabulary marked as complete' };
  } catch (error) {
    console.error("Error updating all progress: ", error);
    throw error;
  }
};

const getUserVocabularyProgress = async (userId) => {
  try {
    const progress = await VocabularyProgress.findAll({
      where: { account_id: userId }
    });
    return progress;
  } catch (error) {
    console.error("Error fetching user progress: ", error);
    throw error;
  }
};

module.exports = {
  updateVocabularyProgress,
  updateAllVocabularyProgress,
  getUserVocabularyProgress
};
