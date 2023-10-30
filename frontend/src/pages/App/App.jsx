import debug from "debug";
import { useContext, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { AdminDashboardPage } from "../Admin/AdminDashboardPage";
import LoginPage from "../AuthPage/LoginPage";
import { UserContext } from "../../hooks/UserProvider";
import UserDashboardPage from "../User/UserDashboardPage";
import SignupPage from "../AuthPage/SignupPage";
import LandingPage from "./LandingPage";
import AllTickersPage from "../Admin/TickersPages/AllTickersPage";
import CreateFundPage from "../Admin/FundPages/CreateFundPage";
import AllFundsPage from "./FundPages/AllFundsPage";
import OneFundPage from "./FundPages/OneFundPage";

const log = debug("frontend:App");
localStorage.debug = "frontend:*";

log("Start app");

export default function App() {
	const { user } = useContext(UserContext);
	const navigate = useNavigate();
	log(user);

	return (
		<main className="App">
			<NavBar user={user} />
			<Routes>
				{user && user.role === "admin" ? (
					<>
						<Route path="/admin" element={<AdminDashboardPage />}></Route>
						<Route path="/admin/tickers" element={<AllTickersPage />} />
						<Route path="/admin/fund/create" element={<CreateFundPage />} />
					</>
				) : null}

				{user && user.role === "user" ? (
					<Route path="/profile" element={<UserDashboardPage />} />
				) : null}

				<Route path="/*" element={<LandingPage />} />
				<Route path="/funds" element={<AllFundsPage />} />
				<Route path="/funds/:fundName" element={<OneFundPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />
			</Routes>
		</main>
	);
}
