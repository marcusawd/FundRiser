-- user table
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- fund table
CREATE TABLE fund (
  fund_id SERIAL PRIMARY KEY,
  fund_name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  created_at DATE DEFAULT CURRENT_TIMESTAMP
);
-- DROP TABLE fund
-- fund_data table
CREATE TABLE fund_data (
  fund_data_id SERIAL PRIMARY KEY,
  fund_id INT NOT NULL REFERENCES fund(fund_id) ON DELETE CASCADE,
  date DATE,
  close_price DECIMAL(10, 2)
);
-- DROP TABLE fund_data
-- user_fund table
CREATE TABLE user_fund (
  user_fund_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(user_id),
  fund_id INT NOT NULL REFERENCES fund(fund_id),
  fund_share_count INT,
  average_price DECIMAL(10,2)
);
-- DROP TABLE user_fund
-- ticker table
CREATE TABLE ticker (
  ticker_id SERIAL PRIMARY KEY,
  ticker_name VARCHAR(255) UNIQUE
);
-- DROP TABLE ticker
-- fund_breakdown table
CREATE TABLE fund_breakdown (
  breakdown_id SERIAL PRIMARY KEY,
  fund_id INT REFERENCES fund(fund_id) ON DELETE CASCADE,
  ticker_id INT REFERENCES ticker(ticker_id) ON DELETE CASCADE,
  weightage INT NOT NULL
);
-- DROP TABLE fund_breakdown
-- stock_data table
CREATE TABLE stock_data (
  stock_data_id SERIAL PRIMARY KEY,
  ticker_id INT NOT NULL REFERENCES ticker(ticker_id) ON DELETE CASCADE,
  date DATE,
  close_price DECIMAL(10, 2)
);
-- DROP TABLE stock_data
-- transaction_type table
CREATE TABLE transaction_type (
  tx_type_id SERIAL PRIMARY KEY,
  tx_name VARCHAR(255) NOT NULL UNIQUE
);
INSERT INTO transaction_type(tx_name) VALUES('Deposit')
INSERT INTO transaction_type(tx_name) VALUES('Withdrawal')
INSERT INTO transaction_type(tx_name) VALUES('Buy Fund')
INSERT INTO transaction_type(tx_name) VALUES('Sell Fund')
-- DROP TABLE transaction_type
-- transaction table
CREATE TABLE transactions (
  tx_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  tx_type_id INT NOT NULL REFERENCES transaction_type(tx_type_id) ON DELETE CASCADE,
  amount DECIMAL(10, 2),
  date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  fund_id INT REFERENCES fund(fund_id) ON DELETE CASCADE,
  share_count INT
);
-- DROP TABLE transactions
CREATE TABLE balance (
  balance_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  cash_balance DECIMAL
)