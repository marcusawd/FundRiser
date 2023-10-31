import { Button, Modal } from "react-bootstrap";

export default function TransactionModal({
	show,
	handleClose,
	purchase,
	fundName,
}) {
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						{purchase ? `Buy (${fundName})` : `Sell (${fundName})`}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>Share Count: 0</Modal.Body>

				<Modal.Body>Balance: $0</Modal.Body>
				<Modal.Body>Current Price: $10</Modal.Body>
				<Modal.Body>Current Price: $10</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
