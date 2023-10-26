const pool = require("../../config/database");
const debug = require("debug")("backend:fundsCtrl");

const createFund = async (req, res) => {
	const { fund_name, description, created_at } = req.body;

	if (!fund_name || !description) {
		return res
			.status(400)
			.json({ error: "Fund name and description are required fields." });
	}
	let query;
	if (created_at) {
		query = {
			text: "INSERT INTO fund(fund_name, description, created_at) VALUES($1,$2,$3)",
			values: [fund_name, description, created_at],
		};
	} else {
		query = {
			text: "INSERT INTO fund(fund_name, description) VALUES($1,$2)",
			values: [fund_name, description],
		};
	}
	try {
		await pool.query(query);

		//* Add base stock price
		const dataQuery = {
			text: `WITH fund_info AS (
              SELECT f.fund_id, f.created_at
              FROM fund f
              WHERE f.fund_name = $1
              )
            INSERT INTO fund_data(fund_id, date, close_price)
            SELECT fund_info.fund_id, fund_info.created_at, 10
            FROM fund_info`,
			values: [fund_name],
		};
		await pool.query(dataQuery);
		res
			.status(201)
			.json({ message: `${fund_name} fund successfully created!` });
	} catch (error) {
		if (error.code === "23505" && error.constraint === "fund_fund_name_key") {
			return res
				.status(409)
				.json({ error: "Fund name taken. Please use a different name" });
		}
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const renameFund = async (req, res) => {
	const oldName = decodeURIComponent(req.params.fundName);
	const { fund_name: newName, description } = req.body;

	const checkParamsQuery = {
		text: "SELECT * FROM fund WHERE fund_name = $1",
		values: [oldName],
	};
	try {
		const { rows } = await pool.query(checkParamsQuery);
		if (rows.length === 0) {
			return res.status(404).json({ error: `${oldName} fund does not exist` });
		}
	} catch (error) {
		return res.status(500).json({ error: "Error executing query" });
	}

	if (newName) {
		const query = {
			text: "SELECT * FROM fund WHERE fund_name = $1",
			values: [newName],
		};
		const { rows } = await pool.query(query);
		if (rows.length > 0) {
			return res.status(409).json({
				error: `${newName} already exists. Please use a different name`,
			});
		}
	}

	const updateQuery = {
		text: `UPDATE fund
           SET
              fund_name = COALESCE($1, fund_name),
              description = COALESCE($2, description)
           WHERE fund_name = $3`,
		values: [newName, description, oldName],
	};

	try {
		await pool.query(updateQuery);
		res.status(200).json({ message: "Fund successfully updated!" });
	} catch (error) {
		res.status(500).json({ error: "Error executing query" });
	}
};

module.exports = { createFund, renameFund };
