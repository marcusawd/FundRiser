import { NavDropdown, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function UserNavBar({ user, handleLogout }) {
	const navigate = useNavigate();
	return (
		<>
			<Navbar.Collapse className="justify-content-center">
				<Navbar.Text>Welcome back, {user.name}!</Navbar.Text>
			</Navbar.Collapse>
			<NavDropdown
				title="Funds"
				id="basic-nav-dropdown"
				style={{ marginRight: "30px" }}>
				<NavDropdown.Item onClick={() => navigate("/funds")}>
					Fund List
				</NavDropdown.Item>
			</NavDropdown>
			<NavDropdown title="Your Account" id="basic-nav-dropdown">
				<NavDropdown.Item onClick={() => navigate("/dashboard")}>
					Dashboard
				</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item onClick={() => navigate("/transfers")}>
					Transfers
				</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item onClick={handleLogout}>Sign Out</NavDropdown.Item>
			</NavDropdown>
		</>
	);
}
