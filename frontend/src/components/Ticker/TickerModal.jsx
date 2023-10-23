import { Button, Modal } from "react-bootstrap";

export default function TickerModal({ show, handleClose, ticker }) {
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{ticker.ticker_name} Details</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Ticker ID: {ticker.ticker_id}</p>
					<p>Stock Growth: {ticker.stock_growth}</p>
					<p>Details: {ticker.details}</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
