//* import -> require
require("dotenv").config();
require("./config/database");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const debug = require("debug")("backend:server");

const usersRouter = require("./routes/api/usersRoutes");
// const checkTokenMiddleware = require("./config/checkToken");

//* app
const app = express();

//* middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// app.use(checkTokenMiddleware);

//* routes
app.use("/api/users", usersRouter);

//? Catch all routes
app.get("/*", (req, res) => {
	res.sendFile(
		path.join(__dirname, "../frontend/dist", "../frontend/dist/index.html"),
	);
});

//* listen
const port = process.env.PORT || 3000;

app.listen(port, function () {
	debug(`Express app running on port ${port}`);
});
