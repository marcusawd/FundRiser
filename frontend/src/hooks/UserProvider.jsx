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

	const getUserFromToken = async () => {
		const user = await getUser();
		setUser(user);
		log("Grabbing user data from token", user);
	};

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

	useEffect(() => {
		getUserFromToken();
	}, []);

	useEffect(() => {
		if (user && user.role !== "admin" && !fetched) {
			fetchTransactionHistory();
		}
	}, [user, fetched]);

	return (
		<UserContext.Provider value={{ user, setUser, txHistory, setFetched }}>
			{children}
		</UserContext.Provider>
	);
};
