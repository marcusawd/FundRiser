import { Button } from "react-bootstrap";
import { checkToken } from "../../utilities/users-service";
import debug from "debug";

const log = debug("mern:pages:OrderHistoryPage");

export default function OrderHistoryPage() {
	const handleCheckToken = async () => {
		const expDate = await checkToken();
		log(expDate);
	};
	return (
		<>
			<h1>OrderHistoryPage</h1>
			<Button onClick={handleCheckToken}>Verify Login</Button>
		</>
	);
}
