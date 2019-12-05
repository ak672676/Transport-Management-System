const express = require("express");

const DriverController = require("../controllers/drivers");

//const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", extractFile, DriverController.createDriver);

router.put("/:id", extractFile, DriverController.updateDriver);

router.get("", DriverController.getDrivers);

router.get("/:id", DriverController.getDriver);

router.delete("/:id", DriverController.deleteDriver);

module.exports = router;
