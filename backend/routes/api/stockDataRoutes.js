const express = require("express");
const router = express.Router();
const stockDataCtrl = require("../../controllers/api/stockDataCtrl");

router.post("/:tickerName", stockDataCtrl.addTickerData);
router.get("/", stockDataCtrl.getTickers);
router.get("/:fundName", stockDataCtrl.getFundTickerData);

module.exports = router;
