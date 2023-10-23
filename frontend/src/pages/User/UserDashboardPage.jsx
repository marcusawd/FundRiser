import { useContext } from "react";
import { UserContext } from "../../hooks/UserProvider";

export default function UserDashboardPage() {
	const { user } = useContext(UserContext);

	return (
		<>
			<h1>Profile Page</h1>
		</>
	);
}
