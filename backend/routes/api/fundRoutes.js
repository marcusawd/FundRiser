const express = require("express");
const router = express.Router();
const fundCtrl = require("../../controllers/api/fundCtrl");
const fundBreakdownCtrl = require("../../controllers/api/fundBreakdownCtrl");
const fundDataCtrl = require("../../controllers/api/fundDataCtrl");
const ensureAdmin = require("../../config/ensureAdmin");

router.post("/", ensureAdmin, fundCtrl.createFund);
router.patch("/:fundName", ensureAdmin, fundCtrl.renameFund);
router.post("/breakdown/:fundName", ensureAdmin, fundBreakdownCtrl.insertAsset);
router.post("/data/:fundName", ensureAdmin, fundDataCtrl.insertFundData);
router.get("/", fundDataCtrl.getAllFundData);

module.exports = router;
