import { useContext, useEffect } from "react";
import { UserContext } from "../../hooks/UserProvider";
import { useNavigate } from "react-router-dom";
import debug from "debug";
import { Button } from "react-bootstrap";
import { getFundTickerData } from "../../utilities/StockData/stockData-service";
import { convertPercentageStringToNumber } from "../../helper/calculateGrowth";

const log = debug("frontend:AdminDashboard");

export function AdminDashboardPage() {
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	const handleClick = async () => {
		try {
		} catch (error) {}
	};

	return (
		<div>
			<div>Welcome {user?.name}</div>
			<Button onClick={handleClick}>Compile Balances of All Users</Button>
		</div>
	);
}
