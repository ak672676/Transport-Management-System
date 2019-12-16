const express = require("express");

const TruckController = require("../controllers/trucks");

//const checkAuth = require("../middleware/check-auth");
//const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", TruckController.createTruck);

router.put("/:id", TruckController.updateTruck);

router.get("", TruckController.getTrucks);

router.get("/:id", TruckController.getTruck);

router.delete("/:id", TruckController.deleteTruck);

module.exports = router;
