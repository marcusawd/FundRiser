const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../../config/database");
const debug = require("debug")("backend:usersCtrl");

const createJWT = (user) => {
	const { user_id, name, email, role } = user;
	const payload = {
		user_id,
		name,
		email,
		role,
	};
	return jwt.sign({ user: payload }, process.env.SECRET, {
		expiresIn: "45m",
	});
};

const create = async (req, res) => {
	const data = req.body;
	const emailRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	if (!emailRegex.test(data.email)) {
		return res.status(400).json({ error: "Invalid email format" });
	}
	const role = data.role ? data.role : "user";
	const hashedPassword = await bcrypt.hash(data.password, 10);
	const client = await pool.connect();
	try {
		await client.query("BEGIN");

		const query = {
			text: "INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, $4) RETURNING*",
			values: [data.name, data.email, hashedPassword, role],
		};
		const result = await client.query(query);
		const { user_id, created_at } = result.rows[0];

		const token = createJWT(result.rows[0]);
		const balanceQuery = {
			text: "INSERT INTO balance(user_id, date, cash_balance) VALUES($1, $2, $3)",
			values: [user_id, created_at, 0],
		};
		await client.query(balanceQuery);
		await client.query("COMMIT");
		res.status(201).json({ token });
	} catch (error) {
		await client.query("ROLLBACK");
		if (error.code === "23505" && error.constraint === "users_email_key") {
			res
				.status(409)
				.json({ error: "Email already exists. Please use a different email" });
		} else {
			res.status(500).json({ error: "Internal Server Error" });
		}
	} finally {
		client.release();
	}
};

const login = async (req, res) => {
	const query = {
		text: "SELECT * FROM users WHERE email = $1",
		values: [req.body.email],
	};
	try {
		const result = await pool.query(query);
		const user = result.rows[0];
		if (!user) {
			throw new Error();
		}
		const match = await bcrypt.compare(req.body.password, user.password);
		if (!match) {
			throw new Error("Incorrect password");
		}
		const token = createJWT(user);
		res.status(200).json({ token });
	} catch (error) {
		const errorMessage = error.message || "Bad Credentials";
		res.status(401).json({ error: errorMessage });
	}
};

const checkToken = (req, res) => {
	debug("req.user", req.user);
	res.json(req.exp);
};

module.exports = { create, login, checkToken };
