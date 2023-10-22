const pool = require("../../config/database");
const alphaQuery = require("../../utils/alphaQuery");
const debug = require("debug")("backend:stockDataCtrl");

const addTickerData = async (req, res) => {
	let { ticker } = req.body;
	ticker = ticker.trim().toUpperCase();
	let count = 0;
	try {
		const dataArr = await alphaQuery(ticker);
		for (const entry of dataArr) {
			const dateToInsert = entry[0];
			const checkQuery = {
				text: "SELECT * FROM stock_data WHERE ticker = $1 AND date = $2",
				values: [ticker, dateToInsert],
			};
			const { rows } = await pool.query(checkQuery);
			debug(rows);
			let dataId;
			if (rows.length === 0) {
				//* Data doesnt exist, insert it into table
				const insertQuery = {
					text: "INSERT INTO stock_data (ticker, date, close_price) VALUES ($1, $2, $3) RETURNING data_id",
					values: [ticker, dateToInsert, entry[1]],
				};
				const insertedData = await pool.query(insertQuery);
				dataId = insertedData.rows[0].data_id;
				count++;
			} else {
				//* Data exist, grab its dataId
				dataId = rows[0].data_id;
			}

			const linkQuery = {
				text: "INSERT INTO stockdata_fundsbreakdown (breakdown_id, data_id) VALUES ((SELECT breakdown_id FROM funds_breakdown WHERE ticker = $1),$2)",
				values: [ticker, dataId],
			};
			await pool.query(linkQuery);
		}
		res.json({ message: `Added ${count} data points for ${ticker}` });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};
module.exports = { addTickerData };
