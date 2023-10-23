const express = require("express");
const router = express.Router();
const stockDataCtrl = require("../../controllers/api/stockDataCtrl");

router.post("/:tickerName", stockDataCtrl.addTickerData);
router.post("/", stockDataCtrl.addTickerName);
router.get("/:tickerName", stockDataCtrl.getTickerData);

module.exports = router;
