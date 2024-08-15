const express = require('express')
const {
    deleteNoti,
    //createOrUpdateNoti,
    createNoti,
    updateNoti,
    getNotiById,
    getAllNoti
} = require('../controllers/notification')
const { checkAuthAndRole } = require('../middleware/auth')

const router = express.Router()
router.get("/all_noti", getAllNoti);
router.post('/createNoti', checkAuthAndRole([1]), createNoti),
router.put('/updateNoti', checkAuthAndRole([1]), updateNoti),
router.post('/noti/findById', getNotiById)
router.post('/noti/delete', checkAuthAndRole([1]), deleteNoti)

module.exports = router
