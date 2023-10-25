const express = require("express");
const router = express.Router();
const stockDataCtrl = require("../../controllers/api/stockDataCtrl");

router.post("/:tickerName", stockDataCtrl.addTickerData);
router.get("/:tickerName", stockDataCtrl.getTickerData);
router.get("/", stockDataCtrl.getTickers);

module.exports = router;
