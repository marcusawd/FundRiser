const pool = require("../../config/database");
const debug = require("debug")("backend:tickerCtrl");

const getAllTickers = async (req, res) => {
	try {
		const { rows } = await pool.query(
			"SELECT ticker_name FROM ticker ORDER BY ticker_name",
		);
		const tickers = rows.map((data) => data.ticker_name);
		res.json({ tickers });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

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

const deleteTicker = async (req, res) => {
	const ticker = decodeURIComponent(req.params.tickerName).toUpperCase();
	debug(ticker);
	const query = {
		text: "DELETE FROM ticker WHERE ticker_name = $1 RETURNING*",
		values: [ticker],
	};
	try {
		const { rows } = await pool.query(query);
		debug(rows);
		if (rows.length > 0) {
			res.json({ message: `${ticker} successfully deleted` });
		} else {
			res.status(404).json({ message: `${ticker} not found` });
		}
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = { getAllTickers, addTickerName, deleteTicker };
