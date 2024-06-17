const { AccountWeek } = require("../../models");
const { responseWithData } = require("../handlers/response_handler");

async function getAllAccountWeek(req, res) {
	try {
		const account_week = await AccountWeek.findAll();
		return responseWithData(res, 200, account_week);
	} catch (error) {
		console.error("Error getting account-week:", error);
		throw error;
	}
}

module.exports = {
	getAllAccountWeek,
};
