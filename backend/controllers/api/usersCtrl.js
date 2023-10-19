const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../../config/database");
const debug = require("debug")("backend:usersCtrl");

const createJWT = (user) => {
	const { id, username, email, role, strategy_id } = user;
	const payload = {
		id,
		username,
		email,
		role,
		strategy_id,
	};
	return jwt.sign({ user: payload }, process.env.SECRET, {
		expiresIn: "15m",
	});
};

const create = async (req, res) => {
	const data = req.body;
	const role = data.role ? data.role : "user";
	const hashedPassword = await bcrypt.hash(data.password, 10);
	const query = {
		text: "INSERT INTO users(username, email, password, role) VALUES($1, $2, $3, $4) RETURNING*",
		values: [data.username, data.email, hashedPassword, role],
	};
	try {
		const result = await pool.query(query);

		const token = createJWT(result.rows[0]);
		res.status(201).json({ token });
	} catch (error) {
		debug("error: ", error);
		if (error.code === "23505" && error.constraint === "users_email_key") {
			res
				.status(409)
				.json({ error: "Email already exists. Please use a different email" });
		} else {
			res.status(500).json({ error: "Internal Server Error" });
		}
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
