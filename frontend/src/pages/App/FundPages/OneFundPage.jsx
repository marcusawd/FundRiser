import { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../hooks/UserProvider";
import { Button, ButtonGroup } from "react-bootstrap";
import StockChart from "../../../components/Charts/StockChart";
import TransactionModal from "../../../components/Transaction/TransactionModal";
import debug from "debug";

const log = debug("frontend:OneFundPage");

export default function OneFundPage() {
	const { user } = useContext(UserContext);
	const { fundName } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const [purchase, setPurchase] = useState(true);
	const fund = location.state;

	fund.sort((a, b) => new Date(a.date) - new Date(b.date));
	for (let i = 1; i < fund.length; i++) {
		const previousPrice = parseFloat(fund[i - 1].close_price);
		const currentPrice = parseFloat(fund[i].close_price);
		const growth = ((currentPrice - previousPrice) / previousPrice) * 100;
		fund[i].growth = growth.toFixed(2) + "%";
	}

	const handleClick = (e) => {
		if (e.target.name === "Buy") {
			setPurchase(true);
		} else if (e.target.name === "Sell") {
			setPurchase(false);
		}
		setShowModal(true);
	};

	return (
		<div style={{ width: "90%", margin: "0 auto" }}>
			<h1>{fundName}</h1>
			<StockChart data={fund} height={400} strokeColor="blue" />
			{user ? (
				<ButtonGroup aria-label="Basic example" onClick={handleClick}>
					<Button variant="success" name="Buy">
						Buy
					</Button>
					<Button variant="danger" name="Sell">
						Sell
					</Button>
				</ButtonGroup>
			) : (
				<Button variant="warning" onClick={() => navigate("/login")}>
					Login to trade
				</Button>
			)}
			<TransactionModal
				show={showModal}
				handleClose={() => setShowModal(false)}
				purchase={purchase}
				fundName={fundName}
				fund={fund}
			/>
		</div>
	);
}
