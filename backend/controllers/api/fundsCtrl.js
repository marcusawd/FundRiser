const pool = require("../../config/database");
const debug = require("debug")("backend:fundsCtrl");

const create = async (req, res) => {
	const { fund_name, allocation_asset, percentage } = req.body;
	if (allocation_asset.length !== 4 || percentage.length !== 4) {
		return res.status(409).json({ error: "Only 4 assets allowed" });
	}

	const sumOfPercentages = percentage.reduce(
		(acc, curr) => acc + parseInt(curr),
		0,
	);
	if (sumOfPercentages !== 100) {
		return res.status(409).json({ error: "Percentages must add up to 100" });
	}

	const checkSet = new Set(allocation_asset);
	if (checkSet.size !== allocation_asset.length) {
		return res
			.status(409)
			.json({ error: "Allocation assets should not contain repeated tickers" });
	}

	const query = {
		text: "INSERT INTO investment_funds(fund_name, allocation_asset, percentage) VALUES($1,$2,$3) RETURNING *",
		values: [fund_name, allocation_asset, percentage],
	};
	debug("query: ", query);

	try {
		const result = await pool.query(query);
		const newFund = result.rows[0];
		debug("result: ", result.rows[0]);
		res.status(201).json({ newFund });
	} catch (error) {
		if (
			error.code === "23505" &&
			error.constraint === "investment_funds_fund_name_key"
		) {
			return res
				.status(409)
				.json({ error: "Fund name taken. Please use a different name" });
		}
		res.status(500).json({ error });
	}
};

module.exports = { create };
