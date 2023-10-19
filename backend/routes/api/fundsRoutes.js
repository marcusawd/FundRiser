const express = require("express");
const router = express.Router();
const fundsCtrl = require("../../controllers/api/fundsCtrl");

router.post("/", fundsCtrl.create);

module.exports = router;
