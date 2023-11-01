import * as transactionApi from "./transaction-api";

export async function depositFunds(amount) {
	const message = await transactionApi.depositFunds(amount);
	return message;
}

export async function withdrawFunds(amount) {
	const message = await transactionApi.withdrawFunds(amount);
	return message;
}

export async function buyFund(data) {
	const response = await transactionApi.buyFund(data);
	return response;
}

export async function sellFund(data) {
	const response = await transactionApi.sellFund(data);
	return response;
}

export async function getHistory() {
	const response = await transactionApi.getHistory();
	return response;
}
