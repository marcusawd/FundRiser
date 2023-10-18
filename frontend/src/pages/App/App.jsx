import debug from "debug";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import AuthPage from "../AuthPage/AuthPage";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import NavBar from "../../components/NavBar/NavBar";

const log = debug("mern:src:App");
localStorage.debug = "mern:*";

log("Start app");

export default function App() {
	const [user, setUser] = useState(null);

	const updateUser = (user) => setUser(user);

	return (
		<main className="App">
			{user ? (
				<>
					<NavBar user={user} setUser={updateUser} />
					<Routes>
						<Route path="/orders/new" element={<NewOrderPage />} />
						<Route path="/orders" element={<OrderHistoryPage />} />
					</Routes>
				</>
			) : (
				<AuthPage setUser={updateUser} />
			)}
		</main>
	);
}
