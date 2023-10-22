import { Link } from "react-router-dom";
import { logOut } from "../../utilities/users-service";

export default function NavBar({ user }) {
	const handleLogout = () => {
		logOut();
	};
	return (
		<>
			<nav>
				<Link to="/orders">Order History</Link>
				&nbsp; | &nbsp;
				<Link to="/orders/new">New Order</Link>
				&nbsp; | &nbsp;
				<span>Welcome, {user.name}</span>
				&nbsp; | &nbsp;
				<Link to="" onClick={handleLogout}>
					Log Out
				</Link>
			</nav>
		</>
	);
}
