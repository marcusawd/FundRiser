import sendRequest from "../sendRequest";

const BASE_URL = "/api/ticker";

export async function addTicker(ticker) {
	const message = await sendRequest(BASE_URL, "POST", ticker);
	return message;
}

export async function getAllTickers() {
	const tickers = await sendRequest(BASE_URL);
	return tickers;
}
