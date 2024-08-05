const express = require('express')
const {
    createNoti,
    getNotiByTargetId,
    updateNoti
} = require('../controllers/notification')
const { checkAuthAndRole } = require('../middleware/auth')

const router = express.Router()

router.post('/noti', checkAuthAndRole([1]), createNoti)
router.post('/noti/findById', getNotiByTargetId)
router.put('/noti', checkAuthAndRole([1]), updateNoti)

module.exports = router
