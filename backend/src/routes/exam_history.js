const express = require('express');
const examHistoryController = require('../controllers/examHistory');
const { checkAuthAndRole } = require('../middleware/auth');
const router = express.Router();

router.post('/examHistories', checkAuthAndRole([1, 3]), examHistoryController.createExamHistory);
router.get('/examHistories', checkAuthAndRole([1, 2, 3, 4]), examHistoryController.getAllExamHistories);
router.get('/examHistories/:examHistoryId', checkAuthAndRole([1, 2, 3, 4]), examHistoryController.getExamHistoryById);
router.put('/examHistories/:examHistoryId', checkAuthAndRole([1, 2, 3]), examHistoryController.updateExamHistory);
router.delete('/examHistories/:examHistoryId', checkAuthAndRole([1, 2, 3]), examHistoryController.deleteExamHistory);

module.exports = router;
