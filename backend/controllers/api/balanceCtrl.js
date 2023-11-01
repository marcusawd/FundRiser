const pool = require("../../config/database");
const debug = require("debug")("backend:balanceCtrl");

const getBalance = async (req, res) => {
	const { user_id } = req.user;
	try {
		const data = await pool.query(
			"SELECT date, cash_balance FROM balance WHERE user_id = $1",
			[user_id],
		);
		res.json(data.rows);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const computeBalance = async (req, res) => {
	// TODO At the end of each month, grab all the data from the month that just passed. Which means you need the month date in req.body
	//* Create a post
};

module.exports = { getBalance };
