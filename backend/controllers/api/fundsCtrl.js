const pool = require("../../config/database");
const debug = require("debug")("backend:fundsCtrl");

const createFund = async (req, res) => {
	const { fund_name } = req.body;
	const query = {
		text: "INSERT INTO investment_funds(fund_name) VALUES($1)",
		values: [fund_name],
	};
	try {
		const { rows } = await pool.query(query);
		res
			.status(201)
			.json({ message: `${fund_name} fund successfully created!` });
	} catch (error) {
		if (
			error.code === "23505" &&
			error.constraint === "investment_funds_fund_name_key"
		) {
			return res
				.status(409)
				.json({ error: "Fund name taken. Please use a different name" });
		}
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const renameFund = async (req, res) => {
	const { fundId } = req.params;
	const { fund_name } = req.body;

	const checkIdQuery = {
		text: "SELECT * FROM investment_funds WHERE fund_id = $1",
		values: [fundId],
	};
	try {
		const { rows } = await pool.query(checkIdQuery);
		if (rows.length === 0) {
			return res
				.status(404)
				.json({ error: "Fund with the provided ID does not exist" });
		}
	} catch (error) {
		return res.status(500).json({ error: "Error executing query" });
	}

	if (fund_name) {
		const query = {
			text: "SELECT * FROM investment_funds WHERE fund_name = $1 AND fund_id != $2",
			values: [fund_name, fundId],
		};
		const { rows } = await pool.query(query);
		if (rows.length > 0) {
			return res.status(409).json({
				error: "Fund name already exists. Please use a different name",
			});
		}
	} else {
		return res.status(409).json({ error: "Please enter a valid name" });
	}

	const updateQuery = {
		text: "UPDATE investment_funds SET fund_name = $1 WHERE fund_id = $2",
		values: [fund_name, fundId],
	};

	try {
		await pool.query(updateQuery);
		res.status(200).json({ message: "Fund name updated successfully" });
	} catch (error) {
		res.status(500).json({ error: "Error executing query" });
	}
};

module.exports = { createFund, renameFund };
