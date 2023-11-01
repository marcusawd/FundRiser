const express = require("express");
const router = express.Router();
const transferCtrl = require("../../controllers/api/Transaction/transferCtrl");

router.post("/transfer/deposit", transferCtrl.deposit);
router.post("/transfer/withdraw", transferCtrl.withdraw);
router.get("/", transferCtrl.getHistory);

module.exports = router;
