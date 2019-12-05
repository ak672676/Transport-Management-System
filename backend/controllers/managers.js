const Manager = require("../models/manager");

exports.createManager = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  console.log("--->" + req.body.name);
  const manager = new Manager({
    name: req.body.name,
    sex: req.body.sex,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    adharNo: req.body.adharNo,
    workingCity: req.body.workingCity,
    imagePath: url + "/images/" + req.file.filename
  });
  //console.log(req.body.title);
  manager.save().then(createdManager => {
    res.status(201).json({
      message: "Manager added successfully",
      manager: {
        ...createdManager,
        id: createdManager._id
      }
    });
  });
};

exports.updateManager = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const manager = new Manager({
    _id: req.body.id,
    name: req.body.name,
    sex: req.body.sex,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email,
    adharNo: req.body.adharNo,
    workingCity: req.body.workingCity,
    imagePath: imagePath
  });
  //console.log(post);
  Manager.updateOne({ _id: req.params.id }, manager)
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

exports.getManagers = (req, res, next) => {
  Manager.find().then(documents => {
    res.status(200).json({
      message: "Cities fetched successfully",
      managers: documents
    });
  });
};

exports.getManager = (req, res, next) => {
  Manager.findById(req.params.id)
    .then(post => {
      if (post) {
        console.log(post);
        res.status(200).json(post);
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

exports.deleteManager = (req, res, next) => {
  console.log("AMIT KUMAR");
  Manager.deleteOne({ _id: req.params.id })
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
