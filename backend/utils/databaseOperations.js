require("dotenv").config();
const pool = require("../config/database");
const {
	allFundLatestDateQuery,
	allUsedTickerLatestDateQuery,
} = require("../model/fundDataQueries");
const { insertStockDataQuery } = require("../model/stockDataQueries");
const alphaQuery = require("./alphaQuery");
const moment = require("moment");

const updateAllFundData = async () => {
	const client = await pool.connect();
	try {
		await client.query("BEGIN");

		//! Grab tickerLatestDates, consume external api for new data, insert into DB for ALL tickers
		const tickerNamesLatestDate = await client.query(
			allUsedTickerLatestDateQuery,
		);
		tickerNamesLatestDate.rows.forEach((item) => {
			const date = moment(item.latest_date).format("YYYY-MM-DD");
			item.latest_date = date;
		});

		for (const item of tickerNamesLatestDate.rows) {
			const tickerName = item.ticker_name;
			const latestDate = item.latest_date;
			const alphaData = await alphaQuery(tickerName);

			const filteredData = alphaData.filter((entry) => {
				const entryDate = entry[0];
				const externalDate = moment(entryDate, "YYYY-MM-DD");
				const latestMoment = moment(latestDate);
				return externalDate.isAfter(latestMoment);
			});

			for (const entry of filteredData) {
				const [date, value] = entry;
				await client.query(insertStockDataQuery, [tickerName, date, value]);
			}
		}

		//TODO Grab allStockData that is being utilised by funds, calculate their growth, grab weightage, calculate individual fund growth

		//! Grabs latestDates of all funds

		const allFundLatestDates = await client.query(allFundLatestDateQuery);
		allFundLatestDates.rows.forEach((item) => {
			const date = moment(item.latest_date).format("YYYY-MM-DD");
			item.latest_date = date;
		});

		//TODO Filter only dates you need to insert, get the new fund price using fund growth, insert new fund price into each fund
		await client.query("COMMIT");
	} catch (error) {
		console.log(error);
		await client.query("ROLLBACK");
	} finally {
		client.release();
	}
};

const getLatestDates = (data) => {
	const latestDates = {};
	data.forEach((item) => {
		const { fund_name, date } = item;
		if (
			!latestDates[fund_name] ||
			new Date(date) > new Date(latestDates[fund_name])
		) {
			latestDates[fund_name] = date;
		}
	});
	return latestDates;
};

module.exports = updateAllFundData;
