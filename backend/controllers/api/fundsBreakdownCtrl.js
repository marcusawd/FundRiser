const pool = require("../../config/database");
const debug = require("debug")("backend:fundsBreakdownCtrl");

const insertAsset = async (req, res) => {
	const { fundId } = req.params;
	let { ticker, percentage } = req.body;
	ticker = ticker.trim().toUpperCase();

	const checkTickerQuery = {
		text: "SELECT * FROM funds_breakdown WHERE fund_id = $1 AND ticker = $2",
		values: [fundId, ticker],
	};
	try {
		const { rows } = await pool.query(checkTickerQuery);
		if (rows.length > 0) {
			return res
				.status(409)
				.json({ error: `${ticker} already exists for this fund` });
		}
	} catch (error) {
		return res.status(500).json({ error: "Error checking ticker" });
	}

	const checkPercentageQuery = {
		text: "SELECT COALESCE(SUM(percentage), 0) as total_percentage FROM funds_breakdown WHERE fund_id = $1",
		values: [fundId],
	};

	try {
		const { rows } = await pool.query(checkPercentageQuery);
		const totalPercentage =
			Number(rows[0].total_percentage) + Number(percentage);
		debug("total %:", totalPercentage);
		if (totalPercentage > 100) {
			return res
				.status(409)
				.json({ error: "Total percentage exceeds 100 for this fund" });
		}
	} catch (error) {
		return res.status(500).json({ error: "Error checking percentages" });
	}

	const query = {
		text: "INSERT INTO funds_breakdown(fund_id, ticker, percentage) VALUES($1,$2,$3)",
		values: [fundId, ticker, percentage],
	};
	try {
		const { rows } = await pool.query(query);
		res.status(201).json({ message: `${ticker} successfully added!` });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = { insertAsset };
