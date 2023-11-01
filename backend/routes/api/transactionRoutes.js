const express = require("express");
const router = express.Router();
const transferCtrl = require("../../controllers/api/Transaction/transferCtrl");
const fundTxCtrl = require("../../controllers/api/Transaction/fundTxCtrl");

router.post("/transfer/deposit", transferCtrl.deposit);
router.post("/transfer/withdraw", transferCtrl.withdraw);
router.post("/buyfund", fundTxCtrl.buyFund);
router.post("/sellfund", fundTxCtrl.sellFund);
router.get("/", transferCtrl.getHistory);

module.exports = router;
