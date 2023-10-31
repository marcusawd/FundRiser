module.exports = function (req, res, next) {
	if (req.user.role !== "user")
		return res.status(401).json({ message: "Not a user" });
	next();
};
