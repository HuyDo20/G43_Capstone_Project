const express = require('express')
const {
    createNoti,
    getNotiByTargetId,
    updateNoti
} = require('../controllers/notification')

const router = express.Router()

router.post('/noti', createNoti)
router.post('/noti/findById', getNotiByTargetId)
router.put('/noti', updateNoti)

module.exports = router
