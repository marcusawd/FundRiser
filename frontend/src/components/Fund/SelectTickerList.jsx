import { Button, Col, Form, ListGroup } from "react-bootstrap";

export default function SelectTickerList({ tickers, handleAddTicker }) {
	return (
		<Col>
			<Form.Group controlId="selectTicker">
				<Form.Label>Select Ticker:</Form.Label>
				<ListGroup style={{ maxHeight: "280px", overflowY: "auto" }}>
					{tickers?.map((ticker) => (
						<ListGroup.Item key={ticker}>
							{ticker}
							<Button
								variant="primary"
								className="ms-2"
								onClick={() => handleAddTicker(ticker)}>
								+
							</Button>
						</ListGroup.Item>
					))}
				</ListGroup>
			</Form.Group>
		</Col>
	);
}
