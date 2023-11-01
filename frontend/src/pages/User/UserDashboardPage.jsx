import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../hooks/UserProvider";
import TransactionHistory from "../../components/Transaction/TransactionHistory";
import { getHistory } from "../../utilities/Transaction/transaction-service";

export default function UserDashboardPage() {
	const { user } = useContext(UserContext);
	const [txHistory, setTxHistory] = useState();

	useEffect(() => {
		async function fetchHistory() {
			try {
				const data = await getHistory();
				setTxHistory(data);
			} catch (error) {
				console.error(error);
			}
		}
		fetchHistory();
	}, []);

	return (
		<>
			<h1>Profile Page</h1>
			<TransactionHistory txHistory={txHistory} />
		</>
	);
}
