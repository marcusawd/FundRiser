import sendRequest from "./sendRequest";

const BASE_URL = "/api/fund";

export async function createFund(fundData) {
	const response = await sendRequest(BASE_URL, "POST", fundData);
	return response;
}
