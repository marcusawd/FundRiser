const pool = require("../../../config/database");
const debug = require("debug")("backend:transferCtrl");
const {
	transferQuery,
	getHistoryQuery,
} = require("../../../model/transactionQueries");

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
	let { withdraw } = req.body;
	withdraw = -1 * Number(withdraw);
	const { user_id } = req.user;
	try {
		await pool.query(transferQuery, [user_id, TRANSACTION_NAME, withdraw]);
		res.status(201).json({ message: "Withdraw success" });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
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
