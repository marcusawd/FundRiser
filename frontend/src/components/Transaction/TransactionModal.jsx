import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { UserContext } from "../../hooks/UserProvider";

import debug from "debug";
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
		setBalance(total);
		setShareCount(count);
	}, [txHistory, fundName]);

	const mostRecentPrice = fund ? fund[fund.length - 1].close_price : 0;
	const totalPrice = mostRecentPrice * quantity;

	const handleQuantityChange = (e) => {
		setQuantity(e.target.value);
	};

	const canBuy = balance >= totalPrice;
	const canSell = shareCount >= quantity;
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
						<Button variant="success" disabled={!canBuy}>
							Buy
						</Button>
					) : (
						<Button variant="danger" disabled={!canSell}>
							Sell
						</Button>
					)}
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
