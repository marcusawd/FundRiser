const transferQuery = `INSERT INTO transactions (user_id, tx_type_id, amount)
VALUES ($1, (SELECT tx_type_id FROM transaction_type WHERE tx_name = $2), $3);`;

const getHistoryQuery = `SELECT t.date, tt.tx_name, t.amount, f.fund_name, t.share_count
FROM transactions t
JOIN transaction_type tt ON t.tx_type_id = tt.tx_type_id
LEFT JOIN fund f ON f.fund_id = t.fund_id
WHERE t.user_id = $1
ORDER BY t.date;`;

const fundtxQuery = `INSERT INTO transactions (user_id, tx_type_id, amount, fund_id, share_count)
VALUES (
    $1,
    (SELECT tx_type_id FROM transaction_type WHERE tx_name = $2),
    $3,
    (SELECT fund_id FROM fund WHERE fund_name = $4),
    $5
);`;

module.exports = { transferQuery, getHistoryQuery, fundtxQuery };
