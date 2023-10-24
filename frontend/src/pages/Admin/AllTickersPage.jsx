import { useEffect, useState } from "react";
import { Container, Pagination, Spinner, Table } from "react-bootstrap";
import TickerModal from "../../components/Ticker/TickerModal";
import { useLocation, useNavigate } from "react-router-dom";
import debug from "debug";
import { getTickers } from "../../utilities/stockData-service";
import TickerInputForm from "../../components/Ticker/TickerInputForm";

const log = debug("frontend:AllTickersPage");

export default function AllTickersPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const [selectedTicker, setSelectedTicker] = useState(null);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [allTickers, setAllTickers] = useState({});

	useEffect(() => {
		async function fetchCourses() {
			try {
				const queryParams = new URLSearchParams(location.search);
				const data = await getTickers(queryParams);
				log(data);
				setAllTickers(data);
				setLoading(false);
			} catch (error) {
				log("Error fetching tickers", error);
				setLoading(false);
			}
		}
		fetchCourses();
	}, [page, location]);

	const handlePageChange = (newPage) => {
		const queryParams = new URLSearchParams(location.search);
		queryParams.set("page", newPage);

		navigate(`?${queryParams.toString()}`);

		setPage(newPage);
	};

	const handleRowClick = (ticker) => {
		setSelectedTicker(ticker);
		setShowModal(true);
	};

	if (loading) {
		return (
			<Container className="d-flex justify-content-center vh-100">
				<Spinner animation="border" variant="success" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</Container>
		);
	}

	return (
		<div>
			<h2>All Tickers</h2>
			<TickerInputForm />
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Ticker Name</th>
						<th>Stock Growth</th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(allTickers.groupedTickers)?.map((ticker) => (
						<tr key={ticker} onClick={() => handleRowClick(ticker)}>
							<td>{ticker}</td>
							{/* <td>{ticker.stock_growth}</td> */}
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
			<Pagination className="justify-content-center mt-3">
				<Pagination.Prev
					onClick={() => handlePageChange(page - 1)}
					disabled={page === 1}
				/>
				{Array.from({ length: allTickers.totalPages || 1 }).map((_, index) => (
					<Pagination.Item
						key={index + 1}
						active={index + 1 === page}
						onClick={() => handlePageChange(index + 1)}>
						{index + 1}
					</Pagination.Item>
				))}
				<Pagination.Next
					onClick={() => handlePageChange(page + 1)}
					disabled={page === allTickers.totalPages}
				/>
			</Pagination>
		</div>
	);
}
