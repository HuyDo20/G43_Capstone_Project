const { AccountDay } = require("../../models");
const { responseWithData } = require("../handlers/response_handler");

async function getAllAccountDay(req, res) {
	try {
		const account_day = await AccountDay.findAll();
		return responseWithData(res, 200, account_day);
	} catch (error) {
		console.error("Error getting account-day:", error);
		throw error;
	}
}

module.exports = {
	getAllAccountDay,
};
