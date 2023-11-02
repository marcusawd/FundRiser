import { createContext, useEffect, useState } from "react";
import { getUser } from "../utilities/User/users-service";
import { getHistory } from "../utilities/Transaction/transaction-service";
import debug from "debug";

const log = debug("frontend:UserProvider");

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [txHistory, setTxHistory] = useState(null);
	const [fetched, setFetched] = useState(false);

	useEffect(() => {
		const getUserFromToken = async () => {
			const fetchedUser = await getUser();
			setUser(fetchedUser);
			log("Grabbing user data from token", fetchedUser);
		};

		if (user && user.role !== "admin" && !fetched) {
			const fetchTransactionHistory = async () => {
				try {
					const data = await getHistory();
					setTxHistory(data);
					setFetched(true);
					log("History of user grabbed");
				} catch (error) {
					console.error(error);
				}
			};
			fetchTransactionHistory();
		} else if (!user) {
			getUserFromToken();
		}
	}, [user, fetched]);

	return (
		<UserContext.Provider value={{ user, setUser, txHistory, setFetched }}>
			{children}
		</UserContext.Provider>
	);
};
