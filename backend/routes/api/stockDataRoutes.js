const express = require("express");
const router = express.Router();
const stockDataCtrl = require("../../controllers/api/stockDataCtrl");
const tickerCtrl = require("../../controllers/api/tickerCtrl");

router.post("/", tickerCtrl.addTickerName);
router.delete("/:tickerName", tickerCtrl.deleteTicker);
router.post("/:tickerName", stockDataCtrl.addTickerData);
router.get("/:tickerName", stockDataCtrl.getTickerData);
router.get("/", stockDataCtrl.getTickers);

module.exports = router;
