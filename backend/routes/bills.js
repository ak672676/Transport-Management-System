const express = require("express");

const BillController = require("../controllers/bills");

//const checkAuth = require("../middleware/check-auth");
//const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", BillController.createBill);

router.put("/:id", BillController.updateBill);

router.put("/city/:id", BillController.updateBillCity);

router.get("", BillController.getBills);

router.get("/:id", BillController.getBill);

router.get("/search/:billId", BillController.getSearchBill);
module.exports = router;
