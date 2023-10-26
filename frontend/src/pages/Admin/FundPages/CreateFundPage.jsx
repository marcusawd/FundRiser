import { useEffect, useState } from "react";
import {
	Alert,
	Button,
	Col,
	Container,
	Form,
	ListGroup,
	ProgressBar,
	Row,
	Table,
} from "react-bootstrap";
import debug from "debug";
import { getAllTickers } from "../../../utilities/ticker-service";
import { createFund, insertAsset } from "../../../utilities/fund-service";
import { useNavigate } from "react-router-dom";

const log = debug("frontend:CreateFundPage");

export default function CreateFundPage() {
	const [tickers, setTickers] = useState([]);
	const [selectedTickers, setSelectedTickers] = useState({});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [progress, setProgress] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchTickers() {
			try {
				const data = await getAllTickers();
				setTickers(data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchTickers();
	}, []);

	const handleAddTicker = (ticker) => {
		setTickers(tickers.filter((t) => t !== ticker));
		setSelectedTickers({ ...selectedTickers, [ticker]: 0 });
	};

	const handleRemoveTicker = (ticker) => {
		const { [ticker]: _, ...updatedTickers } = selectedTickers;
		setSelectedTickers(updatedTickers);
		setTickers([ticker, ...tickers]);
	};

	const totalWeightage = Object.values(selectedTickers).reduce(
		(acc, val) => acc + Number(val),
		0,
	);
	const totalWeightageStyle =
		totalWeightage === 100 ? { color: "green" } : { color: "red" };

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		setError("");
		setLoading(true);
		setProgress(0);

		const fundData = {
			fund_name: event.target.fundName.value,
			description: event.target.description.value,
		};
		if (event.target.date.value) {
			fundData.created_at = event.target.date.value;
		}
		log(fundData);

		try {
			if (totalWeightage !== 100) {
				throw new Error("Total Weightage doesnt add to 100%");
			}
			await createFund(fundData);
			setProgress(25);

			const promises = Object.entries(selectedTickers).map(
				([ticker, weightage]) => {
					return insertAsset(fundData.fund_name, { ticker, weightage });
				},
			);
			await Promise.all(promises);
			setProgress(100);
			setTimeout(() => {
				setLoading(false);
				setProgress(0);
				navigate("/");
			}, 1000);
		} catch (error) {
			setError(error.message);
			setLoading(false);
			setProgress(0);
		}
	};

	return (
		<>
			<Form
				onSubmit={handleFormSubmit}
				style={{ width: "90%", margin: "0 auto" }}>
				<Form.Group className="mb-3" controlId="fundName">
					<Form.Label>Fund Name</Form.Label>
					<Form.Control type="text" placeholder="" required />
				</Form.Group>
				<Form.Group className="mb-3" controlId="description">
					<Form.Label>Description</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						placeholder="Short description of fund category and purpose"
						required
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="date">
					<Form.Label>Date (Optional)</Form.Label>
					<Form.Control type="text" placeholder="YYYY-MM-DD" />
				</Form.Group>
				<Container fluid className="mb-3 text-center">
					<Row>
						<Col xs={12} sm={8}>
							<Form.Group controlId="selectedTickers">
								<Form.Label>Selected Tickers:</Form.Label>
								<Table striped bordered hover>
									<thead>
										<tr>
											<th style={{ width: "5%" }}>#</th>
											<th style={{ width: "40%" }}>Ticker</th>
											<th style={{ width: "15%" }}>Weightage</th>
											<th style={{ width: "15%" }}>Actions</th>
										</tr>
									</thead>
									<tbody>
										{Object.keys(selectedTickers)?.map((ticker, index) => (
											<tr key={ticker}>
												<td>{index + 1}</td>
												<td>{ticker}</td>
												<td>
													<Form.Control
														type="number"
														value={selectedTickers[ticker]}
														min={0}
														onChange={(e) =>
															setSelectedTickers({
																...selectedTickers,
																[ticker]: e.target.value,
															})
														}
													/>
												</td>
												<td>
													<Button
														variant="danger"
														onClick={() => handleRemoveTicker(ticker)}>
														Remove
													</Button>
												</td>
											</tr>
										))}
										<tr>
											<td></td>
											<td>Total Weightage:</td>
											<td style={totalWeightageStyle}>{totalWeightage}%</td>
											<td></td>
										</tr>
									</tbody>
								</Table>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="selectTicker">
								<Form.Label>Select Ticker:</Form.Label>
								<ListGroup>
									{tickers.map((ticker) => (
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
					</Row>
				</Container>

				<Button variant="primary" type="submit" className="mb-3 me-3">
					Submit
				</Button>
				{loading && (
					<ProgressBar animated now={progress} label={`${progress}%`} />
				)}
			</Form>
			{error && (
				<Alert variant="danger" style={{ width: "90%", margin: "auto" }}>
					{error}
				</Alert>
			)}
		</>
	);
}
