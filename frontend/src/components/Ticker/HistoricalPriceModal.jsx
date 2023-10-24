import { Button, Modal, Pagination, Table } from "react-bootstrap";
import moment from "moment";
import { useState } from "react";

export default function HistoricalPriceModal({
	show,
	handleClose,
	tickerData,
}) {
	const [page, setPage] = useState(1);
	const itemsPerPage = 12;
	const totalPages = Math.ceil(tickerData.length / itemsPerPage);
	const startIndex = (page - 1) * itemsPerPage;
	const endIndex = page * itemsPerPage;
	const currentItems = tickerData.slice(startIndex, endIndex);

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						{tickerData[0].ticker_name} Adjusted Historical Price
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Table striped bordered hover className="text-center">
						<thead>
							<tr>
								<th>Date</th>
								<th>Closing Price</th>
								<th>Stock Growth</th>
							</tr>
						</thead>
						<tbody>
							{currentItems?.map((month, index) => (
								<tr key={index}>
									<td>{moment(month.date).format("MMM YYYY")}</td>
									<td>{month.close_price}</td>
									<td>{month.growth}</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Pagination className="d-flex justify-content-center mt-3">
						<Pagination.Prev
							onClick={() => setPage(page - 1)}
							disabled={page === 1}
						/>
						{Array.from({ length: totalPages || 1 }).map((_, index) => (
							<Pagination.Item
								key={index + 1}
								active={index + 1 === page}
								onClick={() => setPage(index + 1)}>
								{index + 1}
							</Pagination.Item>
						))}
						<Pagination.Next
							onClick={() => setPage(page + 1)}
							disabled={page === totalPages}
						/>
					</Pagination>
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
