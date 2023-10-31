import { useLocation, useParams } from "react-router-dom";
import debug from "debug";
import StockChart from "../../../components/Charts/StockChart";
import { Button, ButtonGroup } from "react-bootstrap";
import TransactionModal from "../../../components/Transaction/TransactionModal";
import { useState } from "react";

const log = debug("frontend:OneFundPage");

export default function OneFundPage() {
	const { fundName } = useParams();
	const location = useLocation();
	const fund = location.state;
	const [showModal, setShowModal] = useState(false);
	const [purchase, setPurchase] = useState(true);

	fund.sort((a, b) => new Date(a.date) - new Date(b.date));
	for (let i = 1; i < fund.length; i++) {
		const previousPrice = parseFloat(fund[i - 1].close_price);
		const currentPrice = parseFloat(fund[i].close_price);
		const growth = ((currentPrice - previousPrice) / previousPrice) * 100;
		fund[i].growth = growth.toFixed(2) + "%";
	}
	log(fund);

	const handleClick = (e) => {
		if (e.target.name === "Buy") {
			setPurchase(true);
		} else if (e.target.name === "Sell") {
			setPurchase(false);
		}
		setShowModal(true);
	};

	return (
		<>
			<StockChart data={fund} height={400} strokeColor="blue" />
			<div>{fundName}</div>
			<ButtonGroup aria-label="Basic example" onClick={handleClick}>
				<Button variant="success" name="Buy">
					Buy
				</Button>
				<Button variant="danger" name="Sell">
					Sell
				</Button>
			</ButtonGroup>
			<TransactionModal
				show={showModal}
				handleClose={() => setShowModal(false)}
				purchase={purchase}
				fundName={fundName}
			/>
		</>
	);
}
