import sendRequest from "../sendRequest";
import debug from "debug";

const log = debug("frontend:stockData-api");

const BASE_URL = "/api/stockData";

export async function getTickers(params) {
	return sendRequest(
		`${BASE_URL}?page=${params.page}&pageSize=${params.pageSize}`,
	);
}

export async function addTickerData(ticker) {
	const message = await sendRequest(`${BASE_URL}/${ticker}`, "POST");
	return message;
}

export async function getFundTickerData(fundName) {
	return sendRequest(`${BASE_URL}/${fundName}`);
}
