const request = require("request");

const alphaQuery = (ticker) => {
	return new Promise((resolve, reject) => {
		const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${ticker}&apikey=${process.env.ALPHA_API_KEY}`;

		request.get(
			{
				url: url,
				json: true,
				headers: { "User-Agent": "request" },
			},
			(err, res, data) => {
				if (err) {
					reject(err);
				} else if (res.statusCode !== 200) {
					reject(
						new Error(`Request failed with status code ${res.statusCode}`),
					);
				} else {
					const monthlyTimeSeries = data["Monthly Time Series"];

					const dates = Object.keys(monthlyTimeSeries).filter((date) => {
						const currentDate = new Date(date);
						const startDate = new Date("2015-01-01");
						const endDate = new Date();
						return (
							currentDate.getTime() >= startDate.getTime() &&
							currentDate.getTime() < endDate.getTime()
						);
					});

					const result = dates.map((date) => {
						const entry = monthlyTimeSeries[date];
						return [date, entry["4. close"]];
					});

					result.shift();

					resolve(result);
				}
			},
		);
	});
};

module.exports = alphaQuery;
