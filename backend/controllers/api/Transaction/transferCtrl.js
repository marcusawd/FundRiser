const pool = require("../../../config/database");
const debug = require("debug")("backend:transferCtrl");
const {
	transferQuery,
	getHistoryQuery,
} = require("../../../model/transactionQueries");

const calculateBalance = (data) => {
	let total = 0;
	data.forEach((tx) => {
		total += parseFloat(tx.amount);
	});
	return total;
};

const deposit = async (req, res) => {
	const TRANSACTION_NAME = "Deposit";
	const { deposit } = req.body;
	const { user_id } = req.user;
	try {
		await pool.query(transferQuery, [user_id, TRANSACTION_NAME, deposit]);
		res.status(201).json({ message: "Deposit success" });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const withdraw = async (req, res) => {
	const TRANSACTION_NAME = "Withdrawal";
	const withdraw = parseFloat(req.body.withdraw);
	const { user_id } = req.user;
	const client = await pool.connect();
	try {
		await client.query("BEGIN");
		const history = await client.query(getHistoryQuery, [user_id]);
		const balance = calculateBalance(history.rows);
		if (withdraw > balance) {
			throw new Error("balance");
		}
		await client.query(transferQuery, [user_id, TRANSACTION_NAME, -withdraw]);
		res.status(201).json({ message: "Withdraw success" });

		await client.query("COMMIT");
	} catch (error) {
		if (error.message === "balance") {
			return res
				.status(400)
				.json({ error: "Unable to withdraw more than current balance" });
		}
		res.status(500).json({ error: "Internal Server Error" });
		await client.query("ROLLBACK");
	} finally {
		client.release();
	}
};

const getHistory = async (req, res) => {
	const { user_id } = req.user;
	try {
		const data = await pool.query(getHistoryQuery, [user_id]);
		res.json(data.rows);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = { deposit, withdraw, getHistory };
