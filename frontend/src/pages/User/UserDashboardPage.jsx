import { useContext, useEffect } from "react";
import { UserContext } from "../../hooks/UserProvider";
import TransactionHistory from "../../components/Transaction/TransactionHistory";

export default function UserDashboardPage() {
	const { user } = useContext(UserContext);
	useEffect(() => {
		async function fetchHistory() {
			try {
				// const txHistory
			} catch (error) {
				console.error(error);
			}
		}
		fetchHistory();
	}, []);

	return (
		<>
			<h1>Profile Page</h1>
			<TransactionHistory />
		</>
	);
}
