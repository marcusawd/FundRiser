import moment from "moment";
import debug from "debug";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Alert,
	Button,
	Container,
	Form,
	ProgressBar,
	Row,
} from "react-bootstrap";
import { getAllTickers } from "../../../utilities/ticker-service";
import {
	createFund,
	insertAsset,
	insertFundData,
} from "../../../utilities/fund-service";
import { getFundTickerData } from "../../../utilities/stockData-service";
import { convertPercentageStringToNumber } from "../../../helper/calculateGrowth";
import SelectedTickersTable from "../../../components/Fund/SelectedTickersTable";
import SelectTickerList from "../../../components/Fund/SelectTickerList";

const log = debug("frontend:CreateFundPage");

// TODO Need to ensure correct-ness of date, otherwise data added might fuck up.
// TODO Try to seperate some components and functions, this jsx file is lagging my system i think

export default function CreateFundPage() {
	const [tickers, setTickers] = useState([]);
	const [selectedTickers, setSelectedTickers] = useState({});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [progress, setProgress] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchTickers() {
			try {
				const tickers = await getAllTickers();
				setTickers(tickers);
			} catch (error) {
				log(error.message);
			}
		}
		fetchTickers();
	}, []);

	const handleAddTicker = (ticker) => {
		setTickers(tickers.filter((t) => t !== ticker));
		setSelectedTickers({ ...selectedTickers, [ticker]: 0 });
	};

	const handleRemoveTicker = (ticker) => {
		const { [ticker]: _, ...updatedTickers } = selectedTickers;
		setSelectedTickers(updatedTickers);
		setTickers([ticker, ...tickers]);
	};

	const totalWeightage = Object.values(selectedTickers).reduce(
		(acc, val) => acc + Number(val),
		0,
	);
	const totalWeightageStyle =
		totalWeightage === 100 ? { color: "green" } : { color: "red" };

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		setError("");
		setLoading(true);
		setProgress(0);

		const fundData = {
			fund_name: event.target.fundName.value,
			description: event.target.description.value,
		};
		if (event.target.date.value) {
			fundData.created_at = event.target.date.value;
		}
		log(fundData);

		try {
			if (totalWeightage !== 100) {
				throw new Error("Total Weightage doesnt add to 100%");
			}
			//! 1. Create Fund
			await createFund(fundData);
			setProgress(25);

			const promises = Object.entries(selectedTickers).map(
				([ticker, weightage]) => {
					return insertAsset(fundData.fund_name, { ticker, weightage });
				},
			);
			//! 2. Adding Fund breakdown
			await Promise.all(promises);
			setProgress(35);

			//! 3. Fetching stock data from Fund breakdown
			const groupedTickers = await getFundTickerData(fundData.fund_name);
			log(groupedTickers);
			setProgress(65);

			//! 4. Calculating Fund Data based on created date
			const totalFundGrowth = {};
			for (const ticker_id in groupedTickers) {
				for (const item of groupedTickers[ticker_id]) {
					const growthValue = convertPercentageStringToNumber(item.growth);
					if (!totalFundGrowth[item.date]) {
						totalFundGrowth[item.date] = 0;
					}
					totalFundGrowth[item.date] += growthValue * item.weightage;
				}
			}
			const filteredTotalFundGrowth = Object.fromEntries(
				Object.entries(totalFundGrowth).filter(([date]) =>
					moment(date, "YYYY-MM-DD").isAfter(
						moment(event.target.date.value || "2015-01-01", "YYYY-MM-DD"),
						"month",
					),
				),
			);
			let closePrice = 10; // Base fund price
			const closePricesByDate = {};
			for (const date in filteredTotalFundGrowth) {
				const growthRate = filteredTotalFundGrowth[date] / 100;
				closePrice = closePrice * (1 + growthRate);
				closePricesByDate[date] = closePrice;
			}
			//! 5. Insert fund data into fund
			const response = await insertFundData(
				fundData.fund_name,
				closePricesByDate,
			);
			log(response);
			setProgress(100);
			setTimeout(() => {
				setLoading(false);
				setProgress(0);
				navigate("/");
			}, 1000);
		} catch (error) {
			setError(error.message);
			setLoading(false);
			setProgress(0);
		}
	};

	return (
		<>
			<Form
				onSubmit={handleFormSubmit}
				style={{ width: "90%", margin: "0 auto" }}>
				<Form.Group className="mb-3" controlId="fundName">
					<Form.Label>Fund Name</Form.Label>
					<Form.Control type="text" placeholder="" required />
				</Form.Group>
				<Form.Group className="mb-3" controlId="description">
					<Form.Label>Description</Form.Label>
					<Form.Control
						as="textarea"
						rows={3}
						placeholder="Short description of fund category and purpose"
						required
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="date">
					<Form.Label>Date (Optional)</Form.Label>
					<Form.Control type="text" placeholder="YYYY-MM-DD" />
				</Form.Group>
				<Container fluid className="mb-3 text-center">
					<Row>
						<SelectedTickersTable
							selectedTickers={selectedTickers}
							setSelectedTickers={setSelectedTickers}
							handleRemoveTicker={handleRemoveTicker}
							totalWeightage={totalWeightage}
							totalWeightageStyle={totalWeightageStyle}
						/>
						<SelectTickerList
							tickers={tickers}
							handleAddTicker={handleAddTicker}
						/>
					</Row>
				</Container>

				<Button variant="primary" type="submit" className="mb-3 me-3">
					Submit
				</Button>
			</Form>
			{loading && (
				<ProgressBar
					animated
					now={progress}
					label={`${progress}%`}
					style={{ width: "90%", margin: "auto" }}
				/>
			)}
			{error && (
				<Alert variant="danger" style={{ width: "90%", margin: "auto" }}>
					{error}
				</Alert>
			)}
		</>
	);
}
