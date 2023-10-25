import * as tickerApi from "./ticker-api";

export async function addTicker(ticker) {
	const message = await tickerApi.addTicker(ticker);
	return message;
}

export async function getAllTickers() {
	const tickers = await tickerApi.getAllTickers();
	return tickers;
}
