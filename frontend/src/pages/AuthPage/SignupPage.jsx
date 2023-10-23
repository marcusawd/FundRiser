import { useContext, useState } from "react";
import { signUp } from "../../utilities/users-service";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../../hooks/UserProvider";

export default function SignupPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirm: "",
		error: "",
	});
	const navigate = useNavigate();
	const { setUser } = useContext(UserContext);

	const handleChange = (evt) => {
		setFormData({
			...formData,
			[evt.target.name]: evt.target.value,
			error: "",
		});
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		try {
			const user = await signUp(formData);
			setUser(user);
			navigate("/profile");
		} catch (error) {
			setFormData({ error: "Sign up Failed - Try again" });
		}
	};

	const disable = formData.password !== formData.confirm;

	return (
		<Container className="signuppage">
			<h1>Get started with a free account!</h1>
			<Row>
				<Col md={6}>
					<div className="form-container">
						<Form autoComplete="off" onSubmit={handleSubmit}>
							<Form.Group>
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="text"
									name="name"
									value={formData.name}
									onChange={handleChange}
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									name="password"
									value={formData.password}
									onChange={handleChange}
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Confirm password</Form.Label>
								<Form.Control
									type="password"
									name="confirm"
									value={formData.confirm}
									onChange={handleChange}
									required
								/>
							</Form.Group>
							<br></br>
							<Button type="submit" disabled={disable}>
								SIGN UP
							</Button>
						</Form>
					</div>
					<p className="error-message">&nbsp;{formData.error}</p>
				</Col>
			</Row>
			<Row>
				<Col md={6}>
					<div className="register-link">
						If you have an account, click here to{" "}
						<Link to="/login">login!</Link>
					</div>
				</Col>
			</Row>
		</Container>
	);
}
