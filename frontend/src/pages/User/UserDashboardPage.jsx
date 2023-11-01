import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../hooks/UserProvider";
import TransactionHistory from "../../components/Transaction/TransactionHistory";

export default function UserDashboardPage() {
	const { txHistory } = useContext(UserContext);

	return (
		<>
			<h1>Profile Page</h1>
			<TransactionHistory txHistory={txHistory} />
		</>
	);
}
