import * as transactionApi from "./transaction-api";

export async function depositFunds(amount) {
	const message = await transactionApi.depositFunds(amount);
	return message;
}

export async function withdrawFunds(amount) {
	const message = await transactionApi.withdrawFunds(amount);
	return message;
}

export async function getHistory() {
	const response = await transactionApi.getHistory();
	return response;
}
