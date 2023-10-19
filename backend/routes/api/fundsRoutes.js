const express = require("express");
const router = express.Router();
const fundsCtrl = require("../../controllers/api/fundsCtrl");

router.post("/", fundsCtrl.create);
router.get("/:fundId", fundsCtrl.getOne);
router.patch("/:fundId", fundsCtrl.patchOne);

module.exports = router;
