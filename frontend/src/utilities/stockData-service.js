import { calculateGrowth } from "../helper/calculateGrowth";
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
	const groupedTickers = tickers.reduce((acc, curr) => {
		if (!acc[curr.ticker_name]) {
			acc[curr.ticker_name] = [];
		}
		acc[curr.ticker_name].push(curr);
		return acc;
	}, {});
	calculateGrowth(groupedTickers);
	return { groupedTickers, totalPages };
}

export async function addTickerData(ticker) {
	const message = await stockDataApi.addTickerData(ticker);
	return message;
}
