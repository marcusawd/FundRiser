import { useEffect, useState } from "react";
import {
	Button,
	Col,
	Container,
	Form,
	ListGroup,
	Row,
	Table,
} from "react-bootstrap";
import debug from "debug";

const log = debug("frontend:CreateFundPage");

export default function CreateFundPage() {
	const [tickers, setTickers] = useState([
		"AAPL",
		"GOOGL",
		"MSFT",
		"AMZN",
		"META",
	]);
	const [selectedTickers, setSelectedTickers] = useState({});

	useEffect(() => {
		async function fetchTickers() {
			try {
				log(data);
			} catch (error) {}
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

	const handleFormSubmit = (event) => {
		event.preventDefault();
		// Add your form submission logic here
	};

	return (
		<Form
			onSubmit={handleFormSubmit}
			style={{ width: "90%", margin: "0 auto" }}>
			<Form.Group className="mb-3" controlId="fundName">
				<Form.Label>Fund Name</Form.Label>
				<Form.Control type="text" placeholder="" />
			</Form.Group>
			<Form.Group className="mb-3" controlId="description">
				<Form.Label>Description</Form.Label>
				<Form.Control
					as="textarea"
					rows={3}
					placeholder="Short description of fund category and purpose"
				/>
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

			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
}
