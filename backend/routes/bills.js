const express = require("express");

const BillController = require("../controllers/bills");

//const checkAuth = require("../middleware/check-auth");
//const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", BillController.createBill);

router.get("", BillController.getBills);

module.exports = router;
