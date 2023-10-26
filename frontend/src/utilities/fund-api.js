import sendRequest from "./sendRequest";

const BASE_URL = "/api/fund";

export async function createFund(fundData) {
	const response = await sendRequest(BASE_URL, "POST", fundData);
	return response;
}

export async function insertAsset(fundName, fundData) {
	const response = await sendRequest(
		`${BASE_URL}/${fundName}`,
		"POST",
		fundData,
	);
	return response;
}
