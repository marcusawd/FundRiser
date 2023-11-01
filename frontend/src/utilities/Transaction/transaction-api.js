import sendRequest from "../sendRequest";

const BASE_URL = "/api/transaction";

export async function depositFunds(amount) {
	const message = await sendRequest(
		`${BASE_URL}/transfer/deposit`,
		"POST",
		amount,
	);
	return message;
}

export async function withdrawFunds(amount) {
	const message = await sendRequest(
		`${BASE_URL}/transfer/withdraw`,
		"POST",
		amount,
	);
	return message;
}

export async function buyFund(data) {
	const response = await sendRequest(`${BASE_URL}/buyfund`, "POST", data);
	return response;
}

export async function sellFund(data) {
	const response = await sendRequest(`${BASE_URL}/sellfund`, "POST", data);
	return response;
}

export async function getHistory() {
	const response = await sendRequest(BASE_URL);
	return response;
}
