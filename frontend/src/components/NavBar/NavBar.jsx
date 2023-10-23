import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logOut } from "../../utilities/users-service";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../hooks/UserProvider";

export default function NavBar() {
	const navigate = useNavigate();
	const { user, setUser } = useContext(UserContext);

	const handleLogout = () => {
		logOut();
		setUser(null);
	};

	return (
		<>
			{user ? (
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
							<Navbar.Collapse className="justify-content-center">
								<Navbar.Text>Welcome back, {user.name}!</Navbar.Text>
							</Navbar.Collapse>
							<NavDropdown
								title="Courses"
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
								{user.role === "admin" ? (
									<NavDropdown.Item onClick={() => navigate("/admin")}>
										Admin Dashboard
									</NavDropdown.Item>
								) : (
									<NavDropdown.Item onClick={() => navigate("/profile")}>
										Profile
									</NavDropdown.Item>
								)}

								<NavDropdown.Divider />
								<NavDropdown.Item
									onClick={() => {
										navigate("/");
										handleLogout();
									}}>
									Sign Out
								</NavDropdown.Item>
							</NavDropdown>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			) : (
				<Navbar expand="lg" className="bg-body-tertiary" sticky="top">
					<Container>
						<Navbar.Brand
							className="logo"
							onClick={() => navigate(`/`)}
							aria-controls="basic-navbar-nav">
							<img
								src="https://i.imgur.com/ih08rsx.png"
								width="auto"
								height="75"
								style={{ marginRight: "20px" }}
							/>
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="me-auto">
								{/* <Nav.Link onClick={() => navigate("/courses")}>
									Courses
								</Nav.Link> */}
								<Nav.Link onClick={() => navigate("/signup")}>Sign Up</Nav.Link>
								<Nav.Link onClick={() => navigate("/login")}>Log In</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			)}
		</>
	);
}
