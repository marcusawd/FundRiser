import { useLocation, useParams } from "react-router-dom";
import debug from "debug";
import StockChart from "../../../components/Charts/StockChart";

const log = debug("frontend:OneFundPage");

export default function OneFundPage() {
	const { fundName } = useParams();
	const location = useLocation();
	const fund = location.state;

	fund.sort((a, b) => new Date(a.date) - new Date(b.date));
	for (let i = 1; i < fund.length; i++) {
		const previousPrice = parseFloat(fund[i - 1].close_price);
		const currentPrice = parseFloat(fund[i].close_price);
		const growth = ((currentPrice - previousPrice) / previousPrice) * 100;
		fund[i].growth = growth.toFixed(2) + "%";
	}
	log(fund);

	return (
		<>
			<StockChart data={fund} height={400} strokeColor="blue" />
			<div>{fundName}</div>
		</>
	);
}
