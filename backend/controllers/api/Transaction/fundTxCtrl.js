const pool = require("../../../config/database");
const debug = require("debug")("backend:fundTxCtrl");
const {
	getHistoryQuery,
	fundtxQuery,
} = require("../../../model/transactionQueries");

const calculateBalance = (data) => {
	let total = 0;
	data.forEach((tx) => {
		total += parseFloat(tx.amount);
	});
	return total;
};

const buyFund = async (req, res) => {
	const TRANSACTION_NAME = "Buy Fund";
	const { user_id } = req.user;
	const { fundName, shareCount, amount } = req.body;
	const client = await pool.connect();
	try {
		client.query("BEGIN");
		const history = await client.query(getHistoryQuery, [user_id]);
		const balance = calculateBalance(history.rows);
		if (amount > balance) {
			throw new Error("balance");
		}
		await client.query(fundtxQuery, [
			user_id,
			TRANSACTION_NAME,
			-amount,
			fundName,
			shareCount,
		]);
		res.json({
			message: `${shareCount} shares of ${fundName} purchased for $${amount}`,
		});
		client.query("COMMIT");
	} catch (error) {
		if (error.message === "balance") {
			res.status(400).json({ error: "Insufficient Balance" });
		}
		client.query("ROLLBACK");
	} finally {
		client.release();
	}
};

const sellFund = async (req, res) => {
	const TRANSACTION_NAME = "Sell Fund";
	const { user_id } = req.user;
	const { fundName, shareCount, amount } = req.body;
};

module.exports = { buyFund, sellFund };
