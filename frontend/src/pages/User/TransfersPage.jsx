import { Alert, Button, Form } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../hooks/UserProvider";
import {
	depositFunds,
	withdrawFunds,
} from "../../utilities/Transaction/transaction-service";
import debug from "debug";

const log = debug("frontend:TransfersPage");

export default function TransfersPage() {
	const { txHistory, setFetched } = useContext(UserContext);
	const [status, setStatus] = useState({ success: "", error: "" });
	const [balance, setBalance] = useState(0);

	useEffect(() => {
		let total = 0;
		txHistory?.forEach((tx) => {
			total += parseFloat(tx.amount);
		});
		setBalance(parseFloat(total).toFixed(2));
	}, [txHistory]);

	const handleFormSubmit = async (e) => {
		setStatus({ success: "", error: "" });
		e.preventDefault();
		const deposit = e.target.deposit.value;
		const withdraw = e.target.withdraw.value;

		try {
			if (deposit && withdraw) {
				throw new Error("Cannot deposit and withdraw at the same time");
			} else if (deposit) {
				const response = await depositFunds({ deposit });
				setStatus({ success: response.message, error: "" });
			} else if (withdraw) {
				const response = await withdrawFunds({ withdraw });
				setStatus({ success: response.message, error: "" });
			}
			setFetched(false);
			e.target.reset();
		} catch (error) {
			setStatus({ success: "", error: error.message });
		}
	};
	return (
		<div style={{ width: "90%", margin: "0 auto", maxWidth: "500px" }}>
			<div>Cash Balance: {balance}</div>
			<br />
			<Form onSubmit={handleFormSubmit}>
				<Form.Group className="mb-3" controlId="deposit">
					<Form.Label>Deposit Amount</Form.Label>
					<Form.Control type="number" placeholder="" min={0} />
				</Form.Group>
				<Button className="mb-3" variant="success" type="submit">
					DEPOSIT
				</Button>
				<Form.Group className="mb-3" controlId="withdraw">
					<Form.Label>Withdraw Amount</Form.Label>
					<Form.Control type="number" placeholder="" min={0} />
				</Form.Group>
				<Button className="mb-4" variant="warning" type="submit">
					WITHDRAW
				</Button>
			</Form>
			{status.success && <Alert variant="success">{status.success}</Alert>}
			{status.error && <Alert variant="danger">{status.error}</Alert>}
		</div>
	);
}
