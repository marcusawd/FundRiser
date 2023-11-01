import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
	const navigate = useNavigate();
	return (
		<>
			<br></br>
			<div className="container">
				<div className="row">
					<div className="col-lg-8 col-12">
						<div className="header-intro">
							<h4>Welcome to FundRiser!</h4>
							<p>
								FundRiser is your trusted partner in financial growth and
								investment success.
							</p>
							<p>
								With a dedication to excellence and a commitment to secure and
								profitable investments, we offer you a seamless and effortless
								journey into the world of financial freedom.
							</p>
							<p>
								Our team of expert advisors meticulously curates a diverse range
								of investment funds to cater to your specific financial goals
								and aspirations.
							</p>
							<p>
								Join us today and embark on an exciting and rewarding investment
								experience that brings you one step closer to realizing your
								financial dreams.
							</p>
							<br />
							<Button onClick={() => navigate("/funds")}>Explore Funds</Button>
							<Button variant="link" onClick={() => navigate("/signup")}>
								Ready to Join?
							</Button>
						</div>
					</div>
					<div className="col-lg-4 col-12">
						<div className="header-img text-center">
							<img
								src="../../../plant.jpg"
								alt="Header Image"
								style={{
									maxWidth: "80%",
									borderRadius: "10px",
								}}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="container mt-4">
				<div className="row">
					<div className="services col-12 text-center">
						<h2>Explore Our Services</h2>
						<p>Choose from a list of curated funds managed by our experts!</p>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-lg-4 col-md-6 col-12">
						<h3>01</h3>
						<h4>Curated Investment Funds</h4>
						<p>Invest in our handpicked funds and diversify your portfolio.</p>
					</div>
					<div className="col-lg-4 col-md-6 col-12">
						<h3>02</h3>
						<h4>Expert Analysis</h4>
						<p>
							Gain insights from our comprehensive fund breakdown and analysis.
						</p>
					</div>
					<div className="col-lg-4 col-md-6 col-12">
						<h3>03</h3>
						<h4>Secure Transactions</h4>
						<p>
							Enjoy hassle-free deposit and withdrawal options for seamless
							investing.
						</p>
					</div>
				</div>
			</div>

			<br />
		</>
	);
}
