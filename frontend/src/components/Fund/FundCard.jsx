import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function FundCard() {
	const navigate = useNavigate();
	return (
		<Card border="success" className="d-flex flex-column h-100 mb-3">
			<Card.Header>Name of Fund</Card.Header>
			<Card.Body>
				<Card.Text>Fund Description</Card.Text>
			</Card.Body>
			<Card.Footer className="d-flex justify-content-center">
				<Button variant="outline-success" onClick={() => navigate(`/`)}>
					Read More
				</Button>
			</Card.Footer>
		</Card>
	);
}
