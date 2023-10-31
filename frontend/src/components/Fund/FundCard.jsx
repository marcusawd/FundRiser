import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StockChart from "../Charts/StockChart";

export default function FundCard({ fund }) {
	console.log(fund);
	const navigate = useNavigate();
	return (
		<Card border="info" className="d-flex flex-column h-100 mb-3">
			<Card.Header>{fund[0].fund_name}</Card.Header>
			<Card.Body>
				<StockChart data={fund} dot={false} />

				<Card.Text>{fund[0].description}</Card.Text>
			</Card.Body>
			<Card.Footer className="d-flex justify-content-center">
				<Button
					variant="outline-info"
					onClick={() =>
						navigate(`/funds/${fund[0].fund_name}`, { state: fund })
					}>
					Read More
				</Button>
			</Card.Footer>
		</Card>
	);
}
