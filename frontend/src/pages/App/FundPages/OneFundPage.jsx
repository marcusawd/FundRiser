import { useLocation, useParams } from "react-router-dom";
import debug from "debug";

const log = debug("frontend:OneFundPage");

export default function OneFundPage() {
	const { fundName } = useParams();
	const location = useLocation();
	const fund = location.state;
	log(fund);

	return (
		<>
			<div>{fundName}</div>
		</>
	);
}
