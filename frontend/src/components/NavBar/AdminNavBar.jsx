import { NavDropdown, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AdminNavBar({ user, handleLogout }) {
	const navigate = useNavigate();
	return (
		<>
			<Navbar.Collapse className="justify-content-center">
				<Navbar.Text>Welcome back, {user.name}!</Navbar.Text>
			</Navbar.Collapse>
			<NavDropdown
				title="Admin"
				id="basic-nav-dropdown"
				style={{ marginRight: "30px" }}>
				<NavDropdown.Item onClick={() => navigate("/courses")}>
					Browse Courses
				</NavDropdown.Item>
				<NavDropdown.Item onClick={() => navigate("/courses/create")}>
					Create A Course
				</NavDropdown.Item>
			</NavDropdown>
			<NavDropdown title="Your Account" id="basic-nav-dropdown">
				<NavDropdown.Item onClick={() => navigate("/admin")}>
					Admin Dashboard
				</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item
					onClick={() => {
						navigate("/");
						handleLogout();
					}}>
					Sign Out
				</NavDropdown.Item>
			</NavDropdown>
		</>
	);
}