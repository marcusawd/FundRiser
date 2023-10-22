import debug from "debug";
import NewOrderPage from "../NewOrderPage/UserDashboardPage";
import { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import NavBar from "../../components/NavBar/NavBar";
import { AdminDashboardPage } from "../Admin/AdminDashboardPage";
import LoginPage from "../AuthPage/LoginPage";
import { UserContext } from "../../hooks/UserProvider";

const log = debug("frontend:App");
localStorage.debug = "frontend:*";

log("Start app");

export default function App() {
	const { user } = useContext(UserContext);
	return (
		<main className="App">
			<Routes>
				<Route path="/profile" element={<NewOrderPage />} />
				<Route path="/orders" element={<OrderHistoryPage />} />
				<Route path="/admin" element={<AdminDashboardPage />} />
			</Routes>
			{user ? (
				<>
					<NavBar user={user} />
					<Routes>
						<Route path="/profile" element={<NewOrderPage />} />
						<Route path="/orders" element={<OrderHistoryPage />} />
					</Routes>
				</>
			) : (
				<LoginPage />
			)}
		</main>
	);
}
