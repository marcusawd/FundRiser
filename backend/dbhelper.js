require("dotenv").config();
const pool = require("./config/database");

const createUserTable = async () => {
	const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;

	try {
		await pool.query(createUserTableQuery);
	} catch (error) {
		console.error("Error creating user table:", error);
	}
};

createUserTable();

const tech = {
	fund_name: "Tech",
	allocation_asset: ["QQQ", "VGT", "TSLA", "MSFT"],
	percentage: [50, 20, 15, 15],
};
