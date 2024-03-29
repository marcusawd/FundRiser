import {
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts"; //https://recharts.org/en-US/examples/SimpleLineChart
import debug from "debug";
import moment from "moment";

const log = debug("frontend:StockChart");

export default function StockChart({
	data,
	height = 200,
	strokeColor = "#8884d8",
	dot = true,
}) {
	const minYValue = Math.round(
		Math.min(...data.map((item) => item.close_price)),
	);

	const maxYValue = Math.ceil(
		Math.max(...data.map((item) => item.close_price)),
	);
	const buffer = Math.round(0.1 * (maxYValue - minYValue));

	const yDomain = [Math.max(0, minYValue - buffer), maxYValue];

	return (
		<>
			<ResponsiveContainer width="100%" height={height}>
				<LineChart data={data}>
					<XAxis
						dataKey="date"
						tickFormatter={(date) => moment(date).format("MMM YY")}
					/>
					<YAxis domain={yDomain} />
					<Tooltip />
					<Line
						type="monotone"
						dataKey="close_price"
						stroke={strokeColor}
						dot={dot}
					/>
				</LineChart>
			</ResponsiveContainer>
		</>
	);
}
