import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { getAllFundData } from "../../../utilities/Fund/fund-service";
import FundCard from "../../../components/Fund/FundCard";
import debug from "debug";

const log = debug("frontend:AllFundsPage");

export default function AllFundsPage() {
	// TODO Fetch Fund name, description, and fund_data so that you can pass the data into the FundCard for it to be generated into a chart
	const [allFunds, setAllFunds] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchFunds() {
			try {
				const data = await getAllFundData();
				setAllFunds(data);
				log(data);
				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		}
		fetchFunds();
	}, []);

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
		<>
			<Container>
				<Row className="justify-content-md-center">
					{Object.keys(allFunds)?.map((fund, index) => {
						return (
							<Col key={index} xs={12} sm={12} md={6} lg={6}>
								<FundCard fund={allFunds[fund]} />
							</Col>
						);
					})}
				</Row>
			</Container>
		</>
	);
}
