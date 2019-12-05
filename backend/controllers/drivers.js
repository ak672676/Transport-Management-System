const Driver = require("../models/driver");

exports.createDriver = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  console.log("--->" + req.body.name);
  const driver = new Driver({
    name: req.body.name,
    sex: req.body.sex,
    phone: req.body.phone,
    drivingLic: req.body.drivingLic,
    address: req.body.address,
    adharNo: req.body.adharNo,
    vehicleNo: req.body.vehicleNo,
    imagePath: url + "/images/" + req.file.filename
  });
  //console.log(req.body.title);
  driver.save().then(createdDriver => {
    //console.log(createdDriver);
    res.status(201).json({
      message: "Driver added successfully",
      driver: {
        ...createdDriver,
        id: createdDriver._id
      }
    });
  });
};

exports.updateDriver = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const driver = new Driver({
    _id: req.body.id,
    name: req.body.name,
    sex: req.body.sex,
    phone: req.body.phone,
    address: req.body.address,
    drivingLic: req.body.drivingLic,
    adharNo: req.body.adharNo,
    vehicleNo: req.body.vehicleNo,
    imagePath: imagePath
  });
  //console.log(post);
  Driver.updateOne({ _id: req.params.id }, driver)
    .then(result => {
      if (result.n > 0) {
        console.log("Updated");
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not Authorized" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't update the post"
      });
    });
};

exports.getDrivers = (req, res, next) => {
  Driver.find().then(documents => {
    res.status(200).json({
      message: "Cities fetched successfully",
      drivers: documents
    });
  });
};

exports.getDriver = (req, res, next) => {
  Driver.findById(req.params.id)
    .then(driver => {
      if (driver) {
        console.log(driver);
        res.status(200).json(driver);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Feching Post Failed"
      });
    });
};

exports.deleteDriver = (req, res, next) => {
  console.log("AMIT KUMAR");
  Driver.deleteOne({ _id: req.params.id })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Post Deleted!" });
      } else {
        res.status(401).json({ message: "Not Authorized" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Feching Post Failed"
      });
    });
};
