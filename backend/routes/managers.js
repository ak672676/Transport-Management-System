const express = require("express");

const ManagerController = require("../controllers/managers");

//const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", extractFile, ManagerController.createManager);

router.put("/:id", extractFile, ManagerController.updateManager);

router.get("", ManagerController.getManagers);

router.get("/:id", ManagerController.getManager);

router.delete("/:id", ManagerController.deleteManager);

router.post("/login", ManagerController.loginManager);

module.exports = router;
