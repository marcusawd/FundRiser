const pool = require("../../config/database");
const alphaQuery = require("../../utils/alphaQuery");
const debug = require("debug")("backend:stockDataCtrl");

const addTickerName = async (req, res) => {
	let { ticker } = req.body;
	ticker = ticker.trim().toUpperCase();
	const query = {
		text: "INSERT INTO ticker(ticker_name) VALUES($1)",
		values: [ticker],
	};
	try {
		await pool.query(query);
		res
			.status(201)
			.json({ message: `${ticker} successfully added into Database!` });
	} catch (error) {
		if (
			error.code === "23505" &&
			error.constraint === "ticker_ticker_name_key"
		) {
			return res.status(409).json({ error: "Ticker name already in Database" });
		}
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const addTickerData = async (req, res) => {
	let { tickerName: ticker } = req.params;
	ticker = ticker.trim().toUpperCase();
	let count = 0;
	try {
		const dataArr = await alphaQuery(ticker);
		for (const entry of dataArr) {
			const dateToInsert = entry[0];
			const checkQuery = {
				text: "SELECT * FROM stock_data WHERE ticker_id IN (SELECT ticker_id FROM ticker WHERE ticker_name = $1) AND date = $2",
				values: [ticker, dateToInsert],
			};
			const { rows } = await pool.query(checkQuery);
			if (rows.length === 0) {
				//* Data doesnt exist, insert it into table
				const insertQuery = {
					text: "INSERT INTO stock_data (ticker_id, date, close_price) VALUES ((SELECT ticker_id FROM ticker WHERE ticker_name = $1), $2, $3)",
					values: [ticker, dateToInsert, entry[1]],
				};
				await pool.query(insertQuery);
				count++;
			}
		}
		res.json({ message: `Added ${count} data points for ${ticker}` });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const getTickerData = async (req, res) => {
	let { tickerName: ticker } = req.params;
	ticker = ticker.trim().toUpperCase();
	const query = {
		text: "SELECT s.*, t.ticker_name FROM stock_data s INNER JOIN ticker t ON s.ticker_id = t.ticker_id WHERE t.ticker_name = $1",
		values: [ticker],
	};
	try {
		const { rows } = await pool.query(query);
		if (rows.length === 0) {
			return res.status(404).json({ error: `Data for ${ticker} not found` });
		}
		res.json(rows);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const getTickers = async (req, res) => {
	const page = Number(req.query.page) || 1;
	const pageSize = Number(req.query.pageSize) || 8;
	const skip = (page - 1) * pageSize;
	const resultData = { tickers: [], totalCount: 0 };

	const query = {
		text: `
          SELECT t.ticker_name, sd.date, sd.close_price
          FROM stock_data sd
          JOIN ticker t ON sd.ticker_id = t.ticker_id
          WHERE sd.ticker_id IN (
              SELECT ticker_id
              FROM ticker
              ORDER BY ticker_name
              LIMIT $1 OFFSET $2
          )
          ORDER BY t.ticker_name;`,
		values: [pageSize, skip],
	};
	try {
		const data = await pool.query(query);
		debug(data.rows.length);
		if (data.rows.length > 0) {
			resultData.tickers = data.rows;
		}
		const count = await pool.query("SELECT COUNT(ticker_id) FROM ticker");

		resultData.totalCount = Number(count.rows[0].count);
		debug(resultData);
		res.json(resultData);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};
module.exports = { addTickerName, addTickerData, getTickerData, getTickers };
