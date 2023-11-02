import { Table } from "react-bootstrap";
import moment from "moment";

export default function TransactionHistory({ txHistory }) {
	return (
		<>
			<h3>Transaction History</h3>
			<div style={{ maxHeight: "288px", overflowY: "auto" }}>
				<Table bordered hover>
					<thead>
						<tr>
							<th>Date</th>
							<th>Transaction</th>
							<th>Amount</th>
							<th>Fund Name</th>
							<th>Share Count</th>
						</tr>
					</thead>
					{txHistory?.map((tx, index) => renderGrid(tx, index))}
				</Table>
			</div>
		</>
	);
}

const renderGrid = (tx, index) => {
	return (
		<tbody key={index}>
			<tr>
				{Object.keys(tx)?.map((key, i) => (
					<td key={i}>
						{key === "date" ? moment(tx[key]).format("DD-MMM-YY") : tx[key]}
					</td>
				))}
			</tr>
		</tbody>
	);
};
