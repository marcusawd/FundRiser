const express = require("express");
const router = express.Router();
const fundCtrl = require("../../controllers/api/fundCtrl");
const fundsBreakdownCtrl = require("../../controllers/api/fundsBreakdownCtrl");

router.post("/", fundCtrl.createFund);
router.patch("/:fundName", fundCtrl.renameFund);
router.post("/breakdown/:fundId", fundsBreakdownCtrl.insertAsset);

module.exports = router;
