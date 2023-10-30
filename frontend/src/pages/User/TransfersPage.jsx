import { Alert, Button, Form } from "react-bootstrap";
import debug from "debug";
import { useState } from "react";
import {
	depositFunds,
	withdrawFunds,
} from "../../utilities/Transaction/transaction-service";

const log = debug("frontend:TransfersPage");

export default function TransfersPage() {
	const [status, setStatus] = useState({ success: "", error: "" });
	const handleFormSubmit = async (e) => {
		setStatus({ success: "", error: "" });
		e.preventDefault();
		const deposit = e.target.deposit.value;
		const withdraw = e.target.withdraw.value;

		try {
			if (deposit && withdraw) {
				throw new Error("Cannot deposit and withdraw at the same time");
			} else if (deposit) {
				log(e.target.deposit.value);
				const response = await depositFunds({ deposit });
				log(response);
			} else if (withdraw) {
				log(e.target.withdraw.value);
				const response = await withdrawFunds({ withdraw });
				log(response);
			}
		} catch (error) {
			setStatus({ success: "", error: error.message });
		}
	};
	return (
		<div style={{ width: "90%", margin: "0 auto", maxWidth: "500px" }}>
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
			{status.success && <Alert>{status.success}</Alert>}
			{status.error && <Alert>{status.error}</Alert>}
		</div>
	);
}