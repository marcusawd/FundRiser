import { useState } from "react";
import { Table } from "react-bootstrap";
import TickerModal from "../../components/Ticker/TickerModal";

export default function AllTickersPage() {
	const [showModal, setShowModal] = useState(false);
	const [selectedTicker, setSelectedTicker] = useState(null);

	const tickers = [
		{ ticker_id: 1, ticker_name: "AAPL", stock_growth: 5.2 },
		{ ticker_id: 2, ticker_name: "GOOGL", stock_growth: 3.8 },
		{ ticker_id: 3, ticker_name: "MSFT", stock_growth: 6.7 },
		// Add more ticker data as needed
	];

	const handleRowClick = (ticker) => {
		setSelectedTicker(ticker);
		setShowModal(true);
	};

	return (
		<div>
			<h2>All Tickers</h2>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Ticker ID</th>
						<th>Ticker Name</th>
						<th>Stock Growth</th>
					</tr>
				</thead>
				<tbody>
					{tickers.map((ticker) => (
						<tr key={ticker.ticker_id} onClick={() => handleRowClick(ticker)}>
							<td>{ticker.ticker_id}</td>
							<td>{ticker.ticker_name}</td>
							<td>{ticker.stock_growth}</td>
						</tr>
					))}
				</tbody>
			</Table>
			{selectedTicker && (
				<TickerModal
					show={showModal}
					handleClose={() => setShowModal(false)}
					ticker={selectedTicker}
				/>
			)}
		</div>
	);
}
