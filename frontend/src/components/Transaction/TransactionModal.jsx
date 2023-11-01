import { useContext, useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { UserContext } from "../../hooks/UserProvider";

import debug from "debug";
import {
	buyFund,
	sellFund,
} from "../../utilities/Transaction/transaction-service";
const log = debug("frontend:TranscationModal");

export default function TransactionModal({
	show,
	handleClose,
	purchase,
	fundName,
	fund,
}) {
	const { txHistory, setFetched } = useContext(UserContext);
	const [balance, setBalance] = useState(0);
	const [shareCount, setShareCount] = useState(0);
	const [quantity, setQuantity] = useState(0);
	const [status, setStatus] = useState({ success: "", error: "" });

	useEffect(() => {
		let total = 0;
		let count = 0;
		txHistory?.forEach((tx) => {
			total += parseFloat(tx.amount);
			if (tx.fund_name === fundName) {
				if (tx.tx_name === "Buy Fund") {
					count += tx.share_count;
				} else if (tx.tx_name === "Sell Fund") {
					count -= tx.share_count;
				}
			}
		});
		setBalance(parseFloat(total.toFixed(2)));
		setShareCount(count);
		setStatus({ success: "", error: "" });
	}, [txHistory, fundName]);

	const mostRecentPrice = fund ? fund[fund.length - 1].close_price : 0;
	const totalPrice = (mostRecentPrice * quantity).toFixed(2);
	const canBuy = balance >= totalPrice;
	const canSell = shareCount >= quantity;

	const handleQuantityChange = (e) => {
		setQuantity(e.target.value);
	};

	const handlePurchase = async () => {
		try {
			const data = { fundName, shareCount: quantity, amount: totalPrice };
			if (purchase) {
				const message = await buyFund(data);
				setStatus({ success: message.message, error: "" });
			} else {
				const message = await sellFund(data);
				setStatus({ success: message.message, error: "" });
			}
			setTimeout(() => {
				setFetched(false);
			}, 2000);
		} catch (error) {
			setStatus({ success: "", error: error.message });
		}
	};

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						{purchase ? `Buy (${fundName})` : `Sell (${fundName})`}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Owned Shares: {shareCount}</p>
					<p>Balance: ${balance}</p>
					<p>Current Price: ${mostRecentPrice}</p>
					Qty:{" "}
					<input
						type="number"
						name="quantity"
						onChange={handleQuantityChange}
						className="mb-3"
					/>
					<p>Total: ${totalPrice}</p>
				</Modal.Body>

				<Modal.Footer>
					{purchase ? (
						<Button
							variant="success"
							disabled={!canBuy}
							onClick={handlePurchase}>
							Buy
						</Button>
					) : (
						<Button
							variant="danger"
							disabled={!canSell}
							onClick={handlePurchase}>
							Sell
						</Button>
					)}
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					{status.success && <Alert variant="success">{status.success}</Alert>}
					{status.error && <Alert variant="danger">{status.error}</Alert>}
				</Modal.Footer>
			</Modal>
		</>
	);
}
