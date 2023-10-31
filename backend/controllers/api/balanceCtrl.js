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

module.exports = { getBalance };
