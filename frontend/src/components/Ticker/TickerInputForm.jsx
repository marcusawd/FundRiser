import { useState } from "react";
import { Form, Button, Alert, ProgressBar } from "react-bootstrap";
import { addTicker, addTickerData } from "../../utilities/stockData-service";
import debug from "debug";

const log = debug("frontend:TickerInputForm");

export default function TickerInputForm() {
	const [ticker, setTicker] = useState("");
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	const [progress, setProgress] = useState(0);
	const [loading, setLoading] = useState(false);

	const handleInputChange = (event) => {
		setTicker(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		const result1 = await addTicker({ ticker });
		if (result1.message) {
			setSuccess(result1.message);
		} else if (result1.error) {
			setError(result1.error);
		}
		setProgress(50);
		const result2 = await addTickerData(ticker);
		if (result2.message) {
			setSuccess(result2.message);
		} else if (result2.error) {
			setError(result2.error);
		}
		setProgress(100);

		setTimeout(() => {
			setLoading(false);
			setProgress(0);
		}, 1000);
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
			{loading && (
				<ProgressBar animated now={progress} label={`${progress}%`} />
			)}
			{error && <Alert variant="danger">{error}</Alert>}
			{success && <Alert variant="success">{success}</Alert>}
		</>
	);
}
