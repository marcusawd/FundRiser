import { Link } from "react-router-dom";
import { logOut } from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
	const handleLogout = () => {
		logOut();
		setUser(null);
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
