import debug from "debug";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import LoginPage from "../AuthPage/LoginPage";
import { UserContext } from "../../hooks/UserProvider";
import UserDashboardPage from "../User/UserDashboardPage";
import SignupPage from "../AuthPage/SignupPage";
import LandingPage from "./LandingPage";
import AllTickersPage from "../Admin/TickersPages/AllTickersPage";
import CreateFundPage from "../Admin/FundPages/CreateFundPage";
import AllFundsPage from "./FundPages/AllFundsPage";
import OneFundPage from "./FundPages/OneFundPage";
import TransfersPage from "../User/TransfersPage";

const log = debug("frontend:App");
localStorage.debug = "frontend:*";

log("Start app");

export default function App() {
	const { user } = useContext(UserContext);
	log(user);

	return (
		<>
			<main className="App">
				<NavBar user={user} />
				<Routes>
					{user && user.role === "admin" ? (
						<>
							<Route path="/admin/tickers" element={<AllTickersPage />} />
							<Route path="/admin/fund/create" element={<CreateFundPage />} />
						</>
					) : null}

					{user && user.role === "user" ? (
						<>
							<Route path="/dashboard" element={<UserDashboardPage />} />
							<Route path="/transfers" element={<TransfersPage />} />
						</>
					) : null}

					<Route path="/*" element={<LandingPage />} />
					<Route path="/funds" element={<AllFundsPage />} />
					<Route path="/funds/:fundName" element={<OneFundPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
				</Routes>
			</main>
			<br />
			<hr />
			<footer className="text-center text-dark text-opacity-50">
				<small>
					FundRiser&trade; (est 2023)
					<br />A project by{" "}
					<a
						className="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
						href="https://github.com/marcusawd">
						marcusawd
					</a>
					<br />
					<br />
					Check out my other projects:
					<br />
					<a
						className="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
						href="https://github.com/marcusawd/StockMarketWatch">
						StockMarketWatch GitHub
					</a>{" "}
					|{" "}
					<a
						className="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
						href="https://stock-market-watch-jxfbi5e0c-marcusawd.vercel.app/">
						StockMarketWatch Website
					</a>
					<br />
					<a
						className="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
						href="https://github.com/marcusawd/FinCademy">
						FinCademy GitHub
					</a>{" "}
					|{" "}
					<a
						className="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
						href="https://fincademy.onrender.com/">
						FinCademy Website
					</a>
				</small>
			</footer>
		</>
	);
}
