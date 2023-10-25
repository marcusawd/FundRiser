const express = require("express");
const router = express.Router();
const tickerCtrl = require("../../controllers/api/tickerCtrl");

router.post("/", tickerCtrl.addTickerName);
router.delete("/:tickerName", tickerCtrl.deleteTicker);
router.get("/", tickerCtrl.getAllTickers);

module.exports = router;
