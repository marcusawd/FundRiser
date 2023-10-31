const pool = require("../../../config/database");
const debug = require("debug")("backend:transferCtrl");

const transferQuery = `WITH user_data AS (
                        SELECT user_id FROM users WHERE email = $1),
                        tx_type_data AS (
                        SELECT tx_type_id FROM transaction_type WHERE tx_name = $2)
                      INSERT INTO transactions (user_id, tx_type_id, amount)
                      VALUES (
                        (SELECT user_id FROM user_data),
                        (SELECT tx_type_id FROM tx_type_data),
                        $3);`;

const deposit = async (req, res) => {
	const TRANSACTION_NAME = "Deposit";
	const { deposit } = req.body;
	const { email } = req.user;
	try {
		await pool.query(transferQuery, [email, TRANSACTION_NAME, deposit]);
		res.status(201).json({ message: "Deposit success" });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const withdraw = async (req, res) => {
	const TRANSACTION_NAME = "Withdrawal";
	let { withdraw } = req.body;
	withdraw = -1 * Number(withdraw);
	const { email } = req.user;
	try {
		await pool.query(transferQuery, [email, TRANSACTION_NAME, withdraw]);
		res.status(201).json({ message: "Withdraw success" });
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = { deposit, withdraw };
