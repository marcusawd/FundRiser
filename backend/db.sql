CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE investment_funds (
  fund_id SERIAL PRIMARY KEY,
  fund_name VARCHAR(255) NOT NULL,
  interest_rate DECIMAL(5, 2) NOT NULL,
  last_updated_by VARCHAR(50) --admin name or id
);
CREATE TABLE user_investment (
  user_investment_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  fund_id INT REFERENCES investment_funds(fund_id) ON DELETE CASCADE
);
CREATE TABLE user_balances (
  balance_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  balance_amount DECIMAL(15, 2) NOT NULL,
  last_compound_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_withdrawal_date TIMESTAMP,
  last_deposit_date TIMESTAMP
);
CREATE TABLE transactions (
  transaction_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  transaction_type VARCHAR(20) NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  transaction_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);