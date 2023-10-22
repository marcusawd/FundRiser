export function AdminDashboardPage() {
	if (!user || user.role !== "admin") {
		return <div>You are not authorized to view this page.</div>;
	}

	return <div>You are authorized to view this page!</div>;
}
