import { calculateGrowth } from "../helper/calculateGrowth";
import { groupTickers } from "../helper/groupTickers";
import * as stockDataApi from "./stockData-api";

import debug from "debug";

const log = debug("frontend:stockData-service");

export async function getTickers(queryParams) {
	const page = queryParams.get("page") || 1;
	const pageSize = 8;

	const params = { page, pageSize };
	const data = await stockDataApi.getTickers(params);

	const totalPages = Math.ceil(data.totalCount / pageSize);
	const tickers = data.tickers;
	const groupedTickers = groupTickers("ticker_name", tickers);
	calculateGrowth(groupedTickers);
	return { groupedTickers, totalPages };
}

export async function addTickerData(ticker) {
	const message = await stockDataApi.addTickerData(ticker);
	return message;
}

export async function getFundTickerData(fundName) {
	const data = await stockDataApi.getFundTickerData(fundName);
	if (data.error) {
		throw new Error(data.error);
	}
	const groupedTickers = groupTickers("ticker_id", data);
	calculateGrowth(groupedTickers);
	return groupedTickers;
}
