export default function LandingPage() {
	return (
		<>
			<br></br>
			<div className="container">
				<div className="row">
					<div className="col-lg-6 col-12">
						<div className="header-intro">
							<h4>Welcome to FundRiser!</h4>
							<p>FundRiser description here</p>
						</div>
					</div>
					<div className="col-lg-6 col-12">
						<div className="header-img text-center">
							<img
								src="https://images.pexels.com/photos/3831181/pexels-photo-3831181.jpeg?auto=compress&cs=tinysrgb&w=600"
								alt="Header Image"
								className="rounded-circle"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="row">
					<div className="services">
						<div className="col-12">
							<h5>Our Services</h5>
							<h2>Services We Provide</h2>
							<p>Purchase from a list of curated funds managed by us!</p>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4 col-md-6 col-12">
						<h3>01</h3>
						<h4>Subscription-based learning</h4>
						<p>Pay money to learn to make money</p>
					</div>
					<div className="col-lg-4 col-md-6 col-12">
						<h3>02</h3>
						<h4>Track your progress</h4>
						<p>
							An easy to access profile page where you can track which courses
							you have not completed. Start making money today!
						</p>
					</div>
					<div className="col-lg-4 col-md-6 col-12">
						<h3>03</h3>
						<h4>Improve your financial literacy</h4>
						<p>
							Now you can flex on all your aunties and uncles that you know how
							to manage money
						</p>
					</div>
				</div>
			</div>
			<br />
		</>
	);
}
