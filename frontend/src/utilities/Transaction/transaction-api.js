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
