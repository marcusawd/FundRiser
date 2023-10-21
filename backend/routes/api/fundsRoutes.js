const express = require("express");
const router = express.Router();
const fundsCtrl = require("../../controllers/api/fundsCtrl");
const fundsBreakdownCtrl = require("../../controllers/api/fundsBreakdownCtrl");

router.post("/", fundsCtrl.createFund);
router.patch("/:fundId", fundsCtrl.renameFund);
router.post("/breakdown/:fundId", fundsBreakdownCtrl.insertAsset);

module.exports = router;
