import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function PortfolioPieChart({ txHistory }) {
	const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
					<p>{data.ticker}</p>
					<p>Total Spent: {data.totalSpent}</p>
					<p>Shares Owned: {data.totalQuantity}</p>
				</div>
			);
		}
		return null;
	};

	return (
		<PieChart width={400} height={400}>
			<Pie
				data={data}
				dataKey="totalSpent"
				nameKey="ticker"
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
