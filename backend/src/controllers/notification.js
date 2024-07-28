const { Notification } = require('../../models');
const { User } = require('../../models');
const account = require('../../models/account');
const {
	responseWithData,
	badRequest,
	error,
} = require("../handlers/response_handler");

const {
	CREATE_NOTI_SUCCESS,
	CREATE_NOTI_FAILED,
	GET_NOTI_FAILED,
	GET_NOTI_SUCCESS,
	INVALID_NOTI_ID,
	UPDATE_NOTI_SUCCESS,
	UPDATE_NOTI_FAILED,
	INVALID_NOTI_TYPE,
	TITLE_GUARD,
	CONTENT_GUARD,
	NOTI_DATE_GUARD,
	READ_GUARD,
	TARGET_ID_GUARD,
	SOURCE_ID_GUARD,
	INVALID_NOTI_GET_ID
} = require('../messages/notification');

const NOTI_GET_TYPES = ['all','read','unread']
const DATE_FORMAT_REG = new RegExp(/^\d{4}-\d{2}-\d{2}$/)

const createNoti = async (req, res) => {
    try {
		const { 
			title, 
			content, 
			action, 
			target_id, 
			source_id,
			noti_date = new Date(),
		} = req.body;

		// validate data // TODO: update this if there is any other way to guard data type
		const guardErrors = []
		if(title && title.trim().length === 0) guardErrors.push(TITLE_GUARD)
		if(content && content.trim().length === 0) guardErrors.push(CONTENT_GUARD)
		if(noti_date && !DATE_FORMAT_REG.test(noti_date)) guardErrors.push(NOTI_DATE_GUARD)
		if(target_id && typeof target_id !== 'number') guardErrors.push(TARGET_ID_GUARD)
		if(source_id && typeof source_id !== 'number') guardErrors.push(SOURCE_ID_GUARD)

		if(guardErrors.length > 0) return responseWithData(res, 400, guardErrors)
		
		const notiDateTransfer = new Date(noti_date) // TODO: update to make it schedule able

		const noti = await Notification.create({ 
			title, 
			content,
			is_read: false,
			action, 
			target_id,
			source_id, 
			noti_date: notiDateTransfer,
			created_at: new Date()
		});
		if (noti) {
			return responseWithData(res, 201, { data: noti, message: CREATE_NOTI_SUCCESS }); // TODO: updat this message
		} else {
			return badRequest(res, CREATE_NOTI_FAILED); // TODO: updat this message
		}
	} catch (e) {
		console.error(CREATE_NOTI_FAILED, e);
		return badRequest(res, CREATE_NOTI_FAILED);
	}
}

const getNotiById = async (req, res) => {
	try {
		const { source_id, target_id, type = "all", next_page = 1, limit = 10 } = req.body;

		// validate data // TODO: update if there is other way to guard data type
		if( !NOTI_GET_TYPES.includes(type)) return badRequest(res, INVALID_NOTI_TYPE)
		if( source_id && source_id.trim().length == 0 && target_id && target_id.trim().length == 0)
			return badRequest(res, INVALID_NOTI_GET_ID)

		// decide is_read condition
		let readCondition = {}
		switch(type) {
			case 'read':
				readCondition = { is_read: true }
				break;
			case 'unread':
				readCondition = { is_read: false }
				break
			default: 
				break
		}

		const targetIdCondition = target_id && target_id.trim().length > 0 ? { target_id: target_id.trim() } : {}
		const sourceIdCondition = source_id && source_id.trim().length > 0 ? { source_id: source_id.trim() } : {}

		// get data
		const { count, rows } = await Notification.findAndCountAll({ 
			where: { 
				...targetIdCondition,
				...sourceIdCondition,
				...readCondition },
			limit: limit,
			offset: limit * (next_page - 1),
			order: [
				['created_at', 'DESC' ],
				['noti_date', 'DESC' ]
			]
		});

		if (rows && rows.length > 0) {
			const response = {
				data: rows,
				total_pages: Math.ceil(count / limit),
				current_page: parseInt(next_page),
			}
			return responseWithData(res, 200, { data: response, message: GET_NOTI_SUCCESS }); // TODO: updat this message
		} else {
			return badRequest(res, GET_NOTI_FAILED);
		}
	} catch (e) {
		console.error(GET_NOTI_FAILED, e);
		return badRequest(res, GET_NOTI_FAILED);
	}
}

/**
 * Update reading status of specific notification
 */
const updateNoti = async (req, res) => {
	try {
		const { id, title, content, noti_date, is_read } = req.body;

		// validate data // TODO: update this if there is any other way to guard data type
		const guardErrors = []
		if(title && title.trim().length === 0) guardErrors.push(TITLE_GUARD)
		if(content && content.trim().length === 0) guardErrors.push(CONTENT_GUARD)
		if(noti_date && !DATE_FORMAT_REG.test(noti_date)) guardErrors.push(NOTI_DATE_GUARD)
		if(is_read && typeof is_read !== 'boolean') guardErrors.push(READ_GUARD)

		if(guardErrors.length > 0) return responseWithData(res, 400, guardErrors)

		const notiId = parseInt(id)

		const updatingNoti = notiId && await Notification.findOne({ 
			where: { noti_id: notiId }
		});

		if (!updatingNoti) return badRequest(res, INVALID_NOTI_ID);

		console.log('hihi', account);
		// check if the notification is from admin or not
		const sourceUser = await account.findOne({
			where: { account_id: updateNoti.source_id }
		})

		console.log('source', sourceUser);

		// update data
		const updateData = {
			title: title ? title : updatingNoti.title,
			content: content ? content : updatingNoti.content,
			is_read: is_read ? is_read : updatingNoti.is_read,
			noti_date: noti_date ? new Date(noti_date) : updatingNoti.noti_date,
		}
		const updateRes = await updatingNoti.update(updateData)

		if (updateRes) {
			return responseWithData(res, 200, { data: updateRes, message: UPDATE_NOTI_SUCCESS }); // TODO: update this message
		} else {
			return badRequest(res, UPDATE_NOTI_FAILED);
		}
	} catch (e) {
		console.error(UPDATE_NOTI_FAILED, e.parent);
		return badRequest(res, UPDATE_NOTI_FAILED);
	}
}

module.exports = {
    getNotiByTargetId: getNotiById,
    createNoti,
    updateNoti,
}