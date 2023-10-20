const express = require("express");
const router = express.Router();
const stockDataCtrl = require("../../controllers/api/stockDataCtrl");

router.post("/", stockDataCtrl.addTickerData);

module.exports = router;
