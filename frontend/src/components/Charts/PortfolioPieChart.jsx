import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function PortfolioPieChart({ balance, funds }) {
	const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

	if (balance === null || funds === null) {
		return <div>Loading...</div>;
	}

	let data = [];
	if (balance !== undefined) {
		data.push({ name: "Cash Balance", totalAmount: Number(balance) });
	}
	if (funds !== undefined) {
		data = data.concat(
			Object.keys(funds).map((key) => ({
				name: key,
				totalAmount: funds[key].totalAmount,
				totalShares: funds[key].totalShares,
				averagePricePaid: funds[key].averagePricePaid,
			})),
		);
	}

	console.log(data);

	const CustomTooltip = ({ active, payload }) => {
		if (active) {
			const data = payload[0].payload;
			return (
				<div
					style={{
						backgroundColor: "#fff",
						padding: "5px",
						border: "1px solid #ccc",
					}}>
					<p>{data.name}</p>
					<p>Total Amount: {data.totalAmount}</p>
					{data.totalShares && <p>Shares: {data.totalShares}</p>}
					{data.averagePricePaid && (
						<p>Average Price: {data.averagePricePaid}</p>
					)}
				</div>
			);
		}
		return null;
	};

	return (
		<PieChart width={400} height={400}>
			<Pie
				data={data}
				dataKey="totalAmount"
				nameKey="name"
				cx="50%"
				cy="50%"
				outerRadius={100}
				fill="#8884d8"
				label>
				{data.map((entry, index) => (
					<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
				))}
			</Pie>
			<Tooltip content={<CustomTooltip />} />
		</PieChart>
	);
}
