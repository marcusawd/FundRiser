import { createContext, useEffect, useState } from "react";
import { getUser } from "../utilities/users-service";
import debug from "debug";

const log = debug("frontend:UserProvider");

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const getUserFromToken = async () => {
		const user = await getUser();
		setUser(user);
		log("Grabbing user data from token", user);
	};
	useEffect(() => {
		getUserFromToken();
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
