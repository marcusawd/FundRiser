import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../hooks/UserProvider";
import TransactionHistory from "../../components/Transaction/TransactionHistory";
import PortfolioPieChart from "../../components/Charts/PortfolioPieChart";

export default function UserDashboardPage() {
	const { txHistory } = useContext(UserContext);

	const data = txHistory?.reduce((acc, transaction) => {
		const amount = parseFloat(transaction.amount);
		if (transaction.fund_name !== null) {
			if (!acc[transaction.fund_name]) {
				acc[transaction.fund_name] = 0;
			}
			acc[transaction.fund_name] -= amount;
			acc[transaction.fund_name] = parseFloat(
				acc[transaction.fund_name].toFixed(2),
			);
		} else {
			if (!acc["Cash Balance"]) {
				acc["Cash Balance"] = 0;
			}
			acc["Cash Balance"] += amount;
			acc["Cash Balance"] = parseFloat(acc["Cash Balance"].toFixed(2));
		}
		return acc;
	}, {});

	console.log(data);

	return (
		<>
			{/* <PortfolioPieChart txHistory={txHistory} /> */}
			<TransactionHistory txHistory={txHistory} />
		</>
	);
}
