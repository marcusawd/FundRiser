export const processPortfolioData = (txHistory) => {
	const data = txHistory?.reduce((acc, transaction) => {
		const amount = parseFloat(transaction.amount);
		if (transaction.fund_name !== null) {
			if (!acc[transaction.fund_name]) {
				acc[transaction.fund_name] = {
					totalAmount: 0,
					totalShares: 0,
				};
			}
			const fund = acc[transaction.fund_name];
			const newTotalAmount = fund.totalAmount - amount;
			const newTotalShares = fund.totalShares + transaction.share_count;

			fund.averagePricePaid =
				Math.abs(newTotalShares) < 1e-6 ? 0 : newTotalAmount / newTotalShares;
			fund.totalAmount = newTotalAmount;
			fund.totalShares = newTotalShares;

			acc[transaction.fund_name] = {
				...fund,
				averagePricePaid: parseFloat(fund.averagePricePaid.toFixed(2)),
			};
		}
		return acc;
	}, {});
	if (txHistory) {
		const filteredData = Object.fromEntries(
			Object.entries(data).filter(([, fund]) => fund.totalShares !== 0),
		);
		return filteredData;
	}
};
