import { groupTickers } from "../helper/groupTickers";
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

export async function insertFundData(fundName, fundData) {
	const response = await fundApi.insertFundData(fundName, fundData);
	return response;
}

export async function getAllFundData() {
	const response = await fundApi.getAllFundData();
	if (response.error) {
		throw new Error(response.error);
	}
	const groupedResponse = groupTickers("fund_name", response);
	return groupedResponse;
}
