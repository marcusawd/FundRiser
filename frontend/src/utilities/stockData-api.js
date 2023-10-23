import sendRequest from "./sendRequest";

const BASE_URL = "/api/stockData";

export async function getTickers(params) {
	return sendRequest(
		`${BASE_URL}?page=${params.page}&pageSize=${params.pageSize}`,
	);
}
