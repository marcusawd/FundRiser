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

const calculateShares = (data) => {
	let total = 0;
	data.forEach((tx) => {
		total += tx.share_count;
	});
	return total;
};
const buyFund = async (req, res) => {
	const TRANSACTION_NAME = "Buy Fund";
	const { user_id } = req.user;
	const { fundName, shareCount } = req.body;
	const amount = parseFloat(req.body.amount);
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
	const { fundName, shareCount } = req.body;
	const amount = parseFloat(req.body.amount);
	const client = await pool.connect();
	try {
		client.query("BEGIN");
		const history = await client.query(getHistoryQuery, [user_id]);
		const currentShares = calculateShares(history.rows);
		if (currentShares < shareCount) {
			throw new Error("shares");
		}
		await client.query(fundtxQuery, [
			user_id,
			TRANSACTION_NAME,
			amount,
			fundName,
			shareCount,
		]);
		res.json({
			message: `${shareCount} shares of ${fundName} sold for $${amount}`,
		});
		client.query("COMMIT");
	} catch (error) {
		if (error.message === "shares") {
			res.status(400).json({ error: "Not enough shares to sell" });
		}
		client.query("ROLLBACK");
	} finally {
		client.release();
	}
};

module.exports = { buyFund, sellFund };
