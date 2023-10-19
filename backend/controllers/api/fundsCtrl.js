const pool = require("../../config/database");
const debug = require("debug")("backend:fundsCtrl");

const validateInput = (res, body) => {
	if ("allocation_asset" in body) {
		const { allocation_asset } = body;

		if (allocation_asset.length !== 4) {
			return res.status(409).json({ error: "Only 4 assets allowed" });
		}

		const checkSet = new Set(allocation_asset);
		if (checkSet.size !== allocation_asset.length) {
			return res.status(409).json({
				error: "Allocation assets should not contain repeated tickers",
			});
		}
	}

	if ("percentage" in body) {
		const { percentage } = body;

		if (percentage.length !== 4) {
			return res.status(409).json({ error: "Only 4 assets allowed" });
		}
		const sumOfPercentages = percentage.reduce(
			(acc, curr) => acc + parseInt(curr),
			0,
		);
		if (sumOfPercentages !== 100) {
			return res.status(409).json({ error: "Percentages must add up to 100" });
		}
	}
	return null;
};

const create = async (req, res) => {
	const validationError = validateInput(res, req.body);
	if (validationError) return validationError;

	const { fund_name, allocation_asset, percentage } = req.body;

	const query = {
		text: "INSERT INTO investment_funds(fund_name, allocation_asset, percentage) VALUES($1,$2,$3) RETURNING *",
		values: [fund_name, allocation_asset, percentage],
	};
	debug("query: ", query);

	try {
		const { rows } = await pool.query(query);
		debug("result: ", rows[0]);
		res.status(201).json(rows[0]);
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

const getOne = async (req, res) => {
	const { fundId } = req.params;
	try {
		const query = "SELECT * FROM investment_funds WHERE fund_id = $1";
		const { rows } = await pool.query(query, [fundId]);
		if (rows.length === 0) {
			return res.status(404).json({ error: "Fund not found" });
		}
		res.status(200).json(rows[0]);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const patchOne = async (req, res) => {
	const validationError = validateInput(res, req.body);
	if (validationError) return validationError;

	const { fundId } = req.params;
	const { fund_name, allocation_asset, percentage } = req.body;

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
	}

	const fieldsToUpdate = {};
	if (fund_name) fieldsToUpdate.fund_name = fund_name;
	if (allocation_asset) fieldsToUpdate.allocation_asset = allocation_asset;
	if (percentage) fieldsToUpdate.percentage = percentage;

	const keys = Object.keys(fieldsToUpdate);
	const setValues = keys
		.map((key, index) => `${key} = $${index + 1}`)
		.join(", ");
	const values = keys.map((key) => fieldsToUpdate[key]);
	try {
		const query = {
			text: `UPDATE investment_funds SET ${setValues} WHERE fund_id = $${
				keys.length + 1
			} RETURNING*`,
			values: [...values, fundId],
		};

		const { rows } = await pool.query(query);

		if (rows.length === 0) {
			return res.status(404).json({ error: "Fund not found" });
		}

		res.json(rows[0]);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = { create, getOne, patchOne };
