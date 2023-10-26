const pool = require("../../config/database");
const debug = require("debug")("backend:fundsBreakdownCtrl");

const insertAsset = async (req, res) => {
	const fundName = decodeURIComponent(req.params.fundName);
	let { ticker, weightage } = req.body;
	ticker = ticker.trim().toUpperCase();

	const fundNameQuery = {
		text: "SELECT f.fund_name FROM fund f WHERE f.fund_name = $1",
		values: [fundName],
	};
	try {
		const { rows } = await pool.query(fundNameQuery);
		debug("fund name check", rows);
		if (rows.length === 0) {
			return res.status(404).json({ error: `${fundName} fund does not exist` });
		}
	} catch (error) {
		return res.status(500).json({ error: "Error checking fund name" });
	}

	const checkTickerQuery = {
		text: `SELECT f.fund_name, t.ticker_name, fb.weightage
          FROM fund_breakdown fb
          JOIN ticker t ON fb.ticker_id = t.ticker_id
          JOIN fund f ON fb.fund_id = f.fund_id
          WHERE t.ticker_name = $1 AND f.fund_name = $2`,
		values: [ticker, fundName],
	};
	try {
		const { rows } = await pool.query(checkTickerQuery);
		debug("ticker check", rows);
		if (rows.length > 0) {
			return res
				.status(409)
				.json({ error: `${ticker} already exists for this fund` });
		}
	} catch (error) {
		return res.status(500).json({ error: "Error checking ticker" });
	}

	const checkWeightageQuery = {
		text: "SELECT COALESCE(SUM(weightage), 0) as total_weightage FROM fund_breakdown fb JOIN fund f ON fb.fund_id = f.fund_id WHERE f.fund_name = $1",
		values: [fundName],
	};

	try {
		const { rows } = await pool.query(checkWeightageQuery);
		debug("% check", rows);
		const totalWeightage = Number(rows[0].total_weightage) + Number(weightage);
		debug("total %:", totalWeightage);
		if (totalWeightage > 100) {
			return res
				.status(409)
				.json({ error: "Total weightage exceeds 100 for this fund" });
		}
	} catch (error) {
		return res.status(500).json({ error: "Error checking weightages" });
	}

	const query = {
		text: `WITH fund_id_query AS (
            SELECT fund_id
            FROM fund
            WHERE fund_name = $1
          ),
          ticker_id_query AS (
            SELECT ticker_id
            FROM ticker
            WHERE ticker_name = $2
          )

          INSERT INTO fund_breakdown(fund_id, ticker_id, weightage)
          SELECT fund_id_query.fund_id, ticker_id_query.ticker_id, $3
          FROM fund_id_query, ticker_id_query RETURNING*`,
		values: [fundName, ticker, weightage],
	};
	try {
		const { rows } = await pool.query(query);
		debug("insert", rows);
		res
			.status(201)
			.json({ message: `${ticker} successfully added into ${fundName} fund!` });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = { insertAsset };
