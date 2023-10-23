import { useContext, useEffect } from "react";
import { UserContext } from "../../hooks/UserProvider";
import { useNavigate } from "react-router-dom";
import debug from "debug";

const log = debug("frontend:AdminDashboard");

export function AdminDashboardPage() {
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user || user.role !== "admin") {
			navigate("/unauthorized");
		}
	}, [user]);

	return <div>Welcome {user?.name}</div>;
}
