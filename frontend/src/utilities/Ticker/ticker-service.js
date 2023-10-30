import * as tickerApi from "./ticker-api";
import debug from "debug";

const log = debug("frontend:ticker-service");

export async function addTicker(ticker) {
	const message = await tickerApi.addTicker(ticker);
	return message;
}

export async function getAllTickers() {
	const data = await tickerApi.getAllTickers();
	debug(data);
	if (data.tickers) {
		return data.tickers;
	} else {
		throw new Error(data.error);
	}
}
