const pool = require("../../config/database");
const { insertStockDataQuery } = require("../../model/stockDataQueries");
const alphaQuery = require("../../utils/alphaQuery");
const debug = require("debug")("backend:stockDataCtrl");

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
				await pool.query(insertStockDataQuery, [
					ticker,
					dateToInsert,
					entry[1],
				]);
				count++;
			}
		}
		res.json({ message: `Added ${count} data points for ${ticker}` });
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
		if (data.rows.length > 0) {
			resultData.tickers = data.rows;
		}
		const count = await pool.query("SELECT COUNT(ticker_id) FROM ticker");

		resultData.totalCount = Number(count.rows[0].count);
		res.json(resultData);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const getFundTickerData = async (req, res) => {
	const fundName = decodeURIComponent(req.params.fundName);
	const query = {
		text: `
          SELECT f.fund_id, sd.ticker_id, fb.weightage, sd.close_price, sd.date
          FROM stock_data sd
          JOIN fund_breakdown fb ON fb.ticker_id = sd.ticker_id
          JOIN fund f ON f.fund_id = fb.fund_id
          WHERE f.fund_name = $1`,
		values: [fundName],
	};
	try {
		const { rows } = await pool.query(query);
		if (rows.length === 0) {
			return res.status(404).json({ error: `Data for ${fundName} not found` });
		}
		res.json(rows);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = { addTickerData, getTickers, getFundTickerData };
