import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { addTicker, addTickerData } from "../../utilities/stockData-service";
import debug from "debug";

const log = debug("frontend:TickerInputForm");

export default function TickerInputForm() {
	const [ticker, setTicker] = useState("");
	const [message, setMessage] = useState("");

	const handleInputChange = (event) => {
		setTicker(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const message1 = await addTicker({ ticker });
		log(message1);

		const message2 = await addTickerData(ticker);
		log(message2);

		setTicker("");
	};

	return (
		<>
			<Form onSubmit={handleSubmit} className="mb-3">
				<Form.Group controlId="formTicker">
					<Form.Label>Enter Ticker:</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter ticker"
						value={ticker}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Add Ticker
				</Button>
			</Form>
			<p className="error-message">&nbsp;{message}</p>
		</>
	);
}
