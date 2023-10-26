import { Col, Container, Row } from "react-bootstrap";
import FundCard from "../../components/Fund/FundCard";

export default function AllFundsPage() {
	// TODO Fetch Fund name, description, and fund_data so that you can pass the data into the FundCard for it to be generated into a chart
	return (
		<>
			<Container
				className="d-flex align-items-center justify-content-center"
				style={{ minHeight: "100vh" }}>
				<Row className="justify-content-md-center">
					{allFunds?.map((fund, index) => {
						return (
							<Col key={index} xs={12} sm={6} md={4} lg={3}>
								<FundCard fund={fund} />
							</Col>
						);
					})}
				</Row>
			</Container>
		</>
	);
}
