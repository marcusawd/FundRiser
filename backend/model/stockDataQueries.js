const insertStockDataQuery =
	"INSERT INTO stock_data (ticker_id, date, close_price) VALUES ((SELECT ticker_id FROM ticker WHERE ticker_name = $1), $2, $3)";

module.exports = { insertStockDataQuery };
