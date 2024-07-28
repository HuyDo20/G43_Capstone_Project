// SUCCESS
const CREATE_NOTI_SUCCESS = 'Create notification successfully'
const UPDATE_NOTI_SUCCESS = 'Update notification successfully'
const GET_NOTI_SUCCESS = 'Get notification successfully'

// FAILED
const GET_NOTI_FAILED = 'Can not fetch notification'
const CREATE_NOTI_FAILED = 'Can not create notification'
const UPDATE_NOTI_FAILED = 'Can not update notification'

// Common error messages
const INVALID_NOTI_ID = 'Invalid notification id'
const INVALID_NOTI_TYPE = 'Invalid notification fetching type'

// guard messages
const TITLE_GUARD = 'Title must be non-empty string'
const CONTENT_GUARD = 'Content must be non-empty string'
const ID_GUARD = 'Comment id must be number'
const TARGET_ID_GUARD = 'Target id must be number'
const SOURCE_ID_GUARD = 'Source id must be number'
const READ_GUARD = '\'is_read\' must be boolean'
const NOTI_DATE_GUARD = '\'noti_data\' must be in the format of \'yyyy-MM-dd\''

module.exports = {
    CREATE_NOTI_SUCCESS,
    GET_NOTI_SUCCESS,
    UPDATE_NOTI_SUCCESS,
    CREATE_NOTI_FAILED,
    GET_NOTI_FAILED,
    UPDATE_NOTI_FAILED,
    INVALID_NOTI_ID,
    INVALID_NOTI_TYPE,
    TITLE_GUARD,
    CONTENT_GUARD,
    ID_GUARD,
    TARGET_ID_GUARD,
    SOURCE_ID_GUARD,
    READ_GUARD,
    NOTI_DATE_GUARD
}