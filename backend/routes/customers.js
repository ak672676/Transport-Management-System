const express = require("express");

const CustomerController = require("../controllers/customers");

//const checkAuth = require("../middleware/check-auth");
//const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", CustomerController.createCustomer);

router.put("/:id", CustomerController.updateCustomer);

router.get("", CustomerController.getCustomers);

router.get("/:id", CustomerController.getCustomer);

router.get("/search/:phone", CustomerController.getSearchCustomer);

router.delete("/:id", CustomerController.deleteCustomer);

module.exports = router;
