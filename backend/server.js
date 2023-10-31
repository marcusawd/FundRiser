//* import -> require
require("dotenv").config();
require("./config/database");
// require("./utils/compoundScheduler");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const debug = require("debug")("backend:server");

const usersRouter = require("./routes/api/usersRoutes");
const fundRouter = require("./routes/api/fundRoutes");
const stockDataRouter = require("./routes/api/stockDataRoutes");
const tickerRouter = require("./routes/api/tickerRoutes");
const transactionRouter = require("./routes/api/transactionRoutes");
const balanceRouter = require("./routes/api/balanceRoutes");
const checkTokenMiddleware = require("./config/checkToken");
const ensureUser = require("./config/ensureUser");

//* app
const app = express();

//* middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use(checkTokenMiddleware);

//* routes
app.use("/api/users", usersRouter);
app.use("/api/fund", fundRouter);
app.use("/api/stockData", stockDataRouter);
app.use("/api/ticker", tickerRouter);
app.use("/api/transaction", ensureUser, transactionRouter);
app.use("/api/balance", ensureUser, balanceRouter);

//? Catch all routes
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

//* listen
const port = process.env.PORT || 3000;

app.listen(port, function () {
	debug(`Express app running on port ${port}`);
});
