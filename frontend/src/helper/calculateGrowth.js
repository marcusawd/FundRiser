export const calculateGrowth = (data) => {
	for (const ticker in data) {
		data[ticker].sort((a, b) => new Date(a.date) - new Date(b.date));
		for (let i = 1; i < data[ticker].length; i++) {
			const previousPrice = parseFloat(data[ticker][i - 1].close_price);
			const currentPrice = parseFloat(data[ticker][i].close_price);
			const growth = ((currentPrice - previousPrice) / previousPrice) * 100;
			data[ticker][i].growth = growth.toFixed(2) + "%";
		}
	}
	return data;
};

export const convertPercentageStringToNumber = (percentageString) => {
	if (typeof percentageString === "string") {
		const stringWithoutPercentageSign = percentageString.replace("%", "");
		return parseFloat(stringWithoutPercentageSign) / 100;
	} else {
		return 0;
	}
};
