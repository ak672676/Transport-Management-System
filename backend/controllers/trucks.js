const Truck = require("../models/truck");

exports.createTruck = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  //console.log("--->" + req.body.name);
  const truck = new Truck({
    truckId: null,
    make: req.body.make,
    model: req.body.model,
    chassisNo: req.body.chassisNo,
    vehicleNo: req.body.vehicleNo,
    insCompany: req.body.insCompany,
    insNumber: req.body.insNumber,
    lastServiceDate: req.body.lastServiceDate,
    driverName: req.body.driverName,
    driverId: req.body.driverId,
    billsForTheTruck: []
  });
  //console.log(req.body.title);
  truck.save().then(createdTruck => {
    //console.log(createdDriver);
    res.status(201).json({
      message: "Driver added successfully",
      truck: {
        ...createdTruck,
        id: createdTruck._id,
        truckId: createdTruck.truckId
      }
    });
  });
};

exports.updateTruck = (req, res, next) => {
  const truck = new Truck({
    _id: req.body.id,
    truckId: req.body.truckId,
    make: req.body.make,
    model: req.body.model,
    chassisNo: req.body.chassisNo,
    vehicleNo: req.body.vehicleNo,
    insCompany: req.body.insCompany,
    insNumber: req.body.insNumber,
    lastServiceDate: req.body.lastServiceDate,
    driverName: req.body.driverName,
    driverId: req.body.driverId,
    billsForTheTruck: []
  });

  //console.log(post);
  Truck.updateOne({ _id: req.params.id }, truck)
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

exports.getTrucks = (req, res, next) => {
  Truck.find().then(documents => {
    res.status(200).json({
      message: "Trucks fetched successfully",
      trucks: documents
    });
  });
};

exports.getTruck = (req, res, next) => {
  Truck.findById(req.params.id)
    .then(truck => {
      if (truck) {
        console.log(truck);
        res.status(200).json(truck);
      } else {
        res.status(404).json({ message: "Truck not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Feching Post Failed"
      });
    });
};

exports.deleteTruck = (req, res, next) => {
  console.log("AMIT KUMAR");
  Truck.deleteOne({ _id: req.params.id })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Truck Deleted!" });
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
