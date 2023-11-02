const allFundLatestDateQuery = `SELECT f.fund_name, MAX(fd.date) AS latest_date
FROM fund_data fd
JOIN fund f ON f.fund_id = fd.fund_id
GROUP BY f.fund_name;`;

const allUsedTickerLatestDateQuery = `SELECT t.ticker_name, MAX(sd.date) AS latest_date
FROM stock_data sd
JOIN (
  SELECT t.ticker_id, t.ticker_name
  FROM fund_breakdown fb
  JOIN ticker t ON t.ticker_id = fb.ticker_id
) AS t
ON sd.ticker_id = t.ticker_id
GROUP BY t.ticker_name;`;

module.exports = { allFundLatestDateQuery, allUsedTickerLatestDateQuery };
