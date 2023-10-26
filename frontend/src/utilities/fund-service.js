import * as fundApi from "./fund-api";

export async function createFund(fundData) {
	const response = await fundApi.createFund(fundData);
	if (response.message) {
		return response.message;
	} else if (response.error) {
		throw new Error(response.error);
	}
}

export async function insertAsset(fundName, fundData) {
	const response = await fundApi.insertAsset(fundName, fundData);
	return response;
}
