const pool = require("../../config/database");
const debug = require("debug")("backend:fundDataCtrl");

const insertFundData = async (req, res) => {
	const fundName = decodeURIComponent(req.params.fundName);
	const closePricesByDate = req.body;
	for (const date in closePricesByDate) {
		const closePrice = closePricesByDate[date];
		const query = {
			text: `WITH fund_info AS (
              SELECT f.fund_id
              FROM fund f
              WHERE f.fund_name = $1)
            INSERT INTO fund_data(fund_id, date, close_price)
            SELECT fund_info.fund_id, $2, $3
            FROM fund_info`,
			values: [fundName, date, closePrice],
		};
		try {
			await pool.query(query);
		} catch (error) {
			res.status(500).json({ error: "Internal Server Error" });
		}
	}
	res.json({
		message: `Added ${
			Object.keys(closePricesByDate).length
		} data points to ${fundName}`,
	});
};

const getAllFundData = async (req, res) => {
	const query =
		"SELECT f.fund_name, f.description, fd.close_price, fd.date FROM fund_data fd JOIN fund f on f.fund_id = fd.fund_id";
	try {
		const { rows } = await pool.query(query);
		res.json(rows);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = { insertFundData, getAllFundData };
