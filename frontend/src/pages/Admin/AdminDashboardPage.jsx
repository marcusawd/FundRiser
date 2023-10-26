import { useContext, useEffect } from "react";
import { UserContext } from "../../hooks/UserProvider";
import { useNavigate } from "react-router-dom";
import debug from "debug";
import { Button } from "react-bootstrap";
import { getFundTickerData } from "../../utilities/stockData-service";
import { convertPercentageStringToNumber } from "../../helper/calculateGrowth";

const log = debug("frontend:AdminDashboard");

export function AdminDashboardPage() {
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	const handleClick = async () => {
		try {
			const groupedTickers = await getFundTickerData("65465");
			const totalFundGrowth = {};
			for (const ticker_id in groupedTickers) {
				for (const item of groupedTickers[ticker_id]) {
					const growthValue = convertPercentageStringToNumber(item.growth);
					if (!totalFundGrowth[item.date]) {
						totalFundGrowth[item.date] = 0;
					}
					totalFundGrowth[item.date] += growthValue * item.weightage;
				}
			}
			log(groupedTickers);
			log(totalFundGrowth);
		} catch (error) {
			log(error.message);
		}
	};

	return (
		<div>
			<div>Welcome {user?.name}</div>
			<Button onClick={handleClick}>TEST</Button>
		</div>
	);
}
