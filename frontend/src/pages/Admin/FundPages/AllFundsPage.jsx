import { Col, Container, Row } from "react-bootstrap";

export default function AllFundsPage() {
	return (
		<>
			<Container
				className="d-flex align-items-center justify-content-center"
				style={{ minHeight: "100vh" }}>
				<Row className="justify-content-md-center">
					{allFunds?.map((fund, index) => {
						return (
							<Col key={index} xs={12} sm={6} md={4} lg={3}>
								<CourseCard fund={fund} />
							</Col>
						);
					})}
				</Row>
			</Container>
		</>
	);
}
