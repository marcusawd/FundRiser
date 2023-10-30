import sendRequest from "../sendRequest";

const BASE_URL = "/api/fund";

export async function createFund(fundData) {
	const response = await sendRequest(BASE_URL, "POST", fundData);
	return response;
}

export async function insertAsset(fundName, fundData) {
	const response = await sendRequest(
		`${BASE_URL}/breakdown/${fundName}`,
		"POST",
		fundData,
	);
	return response;
}

export async function insertFundData(fundName, fundData) {
	const response = await sendRequest(
		`${BASE_URL}/data/${fundName}`,
		"POST",
		fundData,
	);
	return response;
}

export async function getAllFundData() {
	const response = await sendRequest(BASE_URL);
	return response;
}
