const express = require("express");
const router = express.Router();
const balanceCtrl = require("../../controllers/api/balanceCtrl");

router.get("/", balanceCtrl.getBalance);

module.exports = router;
