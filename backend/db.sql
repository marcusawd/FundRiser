-- fund table
CREATE TABLE fund (
  fund_id SERIAL PRIMARY KEY,
  fund_name VARCHAR(255)
);
-- user_fund table
CREATE TABLE user_fund (
  user_fund_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES user(user_id),
  fund_id INT REFERENCES fund(fund_id),
  fund_share_count INT
);
-- fund_breakdown table
CREATE TABLE fund_breakdown (
  breakdown_id SERIAL PRIMARY KEY,
  fund_id INT REFERENCES fund(fund_id),
  ticker_id INT REFERENCES ticker(ticker_id)
);
-- ticker table
CREATE TABLE ticker (
  ticker_id SERIAL PRIMARY KEY,
  ticker_name VARCHAR(255)
);
-- stock_data table
CREATE TABLE stock_data (
  stock_data_id SERIAL PRIMARY KEY,
  ticker_id INT REFERENCES ticker(ticker_id),
  date DATE,
  close_price DECIMAL(10, 2)
);
-- user table
CREATE TABLE user (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- transaction table
CREATE TABLE transaction (
  tx_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES user(user_id),
  tx_type_id INT REFERENCES transaction_type(tx_type_id),
  amount DECIMAL(10, 2),
  date DATE,
  fund_id INT REFERENCES fund(fund_id)
);
-- transaction_type table
CREATE TABLE transaction_type (
  tx_type_id SERIAL PRIMARY KEY,
  tx_name VARCHAR(255)
);
-- fund_data table
CREATE TABLE fund_data (
  fund_data_id SERIAL PRIMARY KEY,
  fund_id INT REFERENCES fund(fund_id),
  date DATE,
  close_price DECIMAL(10, 2)
);