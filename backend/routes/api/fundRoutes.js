const express = require("express");
const router = express.Router();
const fundCtrl = require("../../controllers/api/fundCtrl");
const fundBreakdownCtrl = require("../../controllers/api/fundBreakdownCtrl");

router.post("/", fundCtrl.createFund);
router.patch("/:fundName", fundCtrl.renameFund);
router.post("/breakdown/:fundName", fundBreakdownCtrl.insertAsset);

module.exports = router;
