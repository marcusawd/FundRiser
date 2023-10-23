import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { logOut } from "../../utilities/users-service";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../hooks/UserProvider";
import AdminNavBar from "./adminNavBar";
import UserNavBar from "./UserNavBar";

export default function NavBar() {
	const navigate = useNavigate();
	const { user, setUser } = useContext(UserContext);

	const handleLogout = () => {
		logOut();
		setUser(null);
	};

	return (
		<>
			<Navbar expand="lg" className="bg-body-tertiary" sticky="top">
				<Container>
					<Link to="/">
						<img
							src="https://i.imgur.com/ih08rsx.png"
							width="auto"
							height="75"
							style={{ marginRight: "20px" }}
						/>
					</Link>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						{user ? (
							user.role === "admin" ? (
								<AdminNavBar user={user} handleLogout={handleLogout} />
							) : (
								<UserNavBar user={user} handleLogout={handleLogout} />
							)
						) : (
							<Nav className="me-auto">
								<Nav.Link onClick={() => navigate("/courses")}>
									Courses
								</Nav.Link>
								<Nav.Link onClick={() => navigate("/signup")}>Sign Up</Nav.Link>
								<Nav.Link onClick={() => navigate("/login")}>Log In</Nav.Link>
							</Nav>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}
