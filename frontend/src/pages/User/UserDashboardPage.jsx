import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../hooks/UserProvider";
import { processPortfolioData } from "../../helper/processPortfolioData";
import TransactionHistory from "../../components/Transaction/TransactionHistory";
import PortfolioPieChart from "../../components/Charts/PortfolioPieChart";
import { Col, Container, Row } from "react-bootstrap";

export default function UserDashboardPage() {
	const { txHistory } = useContext(UserContext);
	const [balance, setBalance] = useState(0);
	const [funds, setFunds] = useState({});

	useEffect(() => {
		let total = 0;
		txHistory?.forEach((tx) => {
			total += parseFloat(tx.amount);
		});
		setBalance(parseFloat(total).toFixed(2));
		const filteredData = processPortfolioData(txHistory);
		setFunds(filteredData);
	}, [txHistory]);

	console.log(funds);

	return (
		<>
			<h1 className="text-center">Cash Balance ${balance}</h1>
			<br />
			<Container>
				<Row>
					<Col>
						<PortfolioPieChart balance={balance} funds={funds} />
					</Col>
					<Col>
						<TransactionHistory txHistory={txHistory} />
					</Col>
				</Row>
			</Container>
		</>
	);
}
