const pool = require("../../config/database");
const alphaQuery = require("../../utils/alphaQuery");
const debug = require("debug")("backend:stockDataCtrl");

const addTickerData = async (req, res) => {
	const { fund_id, ticker } = req.body;
	try {
		const dataArr = await alphaQuery(ticker);
		for (const entry of dataArr) {
			const dateToInsert = entry[0];
			const checkQuery = {
				text: "SELECT date FROM stock_data WHERE fund_id = $1 AND ticker = $2 AND date = $3",
				values: [fund_id, ticker, dateToInsert],
			};
			const { rows } = await pool.query(checkQuery);
			if (rows.length === 0) {
				const insertQuery = {
					text: "INSERT INTO stock_data (fund_id, ticker, date, close_price) VALUES ($1, $2, $3, $4) RETURNING*",
					values: [fund_id, ticker, dateToInsert, entry[1]],
				};
				const { rows } = await pool.query(insertQuery);
				debug(rows);
			}
		}
	} catch (error) {
		console.error(error);
	}
};
module.exports = { addTickerData };
