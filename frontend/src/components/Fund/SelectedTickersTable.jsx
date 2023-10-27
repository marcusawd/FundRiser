import { Button, Col, Form, Table } from "react-bootstrap";

export default function SelectedTickersTable({
	selectedTickers,
	setSelectedTickers,
	handleRemoveTicker,
	totalWeightage,
	totalWeightageStyle,
}) {
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
	</Col>;
}
