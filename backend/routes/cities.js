const express = require("express");
const City = require("../models/city");
//const multer = require("multer");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const isValid = MIME_TYPE_MAP[file.mimetype];
//     let error = new Error("Invalid MIME type");
//     if (isValid) {
//       error = null;
//     }
//     cb(error, "backend/images");
//   },
//   filename: (req, file, cb) => {
//     const name = file.originalname
//       .toLowerCase()
//       .split(" ")
//       .join("-");
//     const ext = MIME_TYPE_MAP[file.mimetype];

//     cb(null, name + "-" + Date.now() + "." + ext);
//   }
// });
//multer({ storage: storage }).single("image"),
router.post("", (req, res, next) => {
  //const url = req.protocol + "://" + req.get("host");
  console.log("----> " + req.body.cityName);
  const city = new City({
    cityName: req.body.cityName,
    landmark: req.body.landmark,
    pin: req.body.pin,
    manager: req.body.manager
    //imagePath: url + "/images/" + req.file.filename
  });

  city.save().then(createdCity => {
    res.status(201).json({
      message: "City Added Successfully",
      city: {
        ...createdCity,
        id: createdCity._id
      }
    });
    console.log(createdCity);
  });
});

//
const mong0 = "35sKKp2yAFS9EZVH";

/*
mongodb+srv://amit:zghncvdBeMKaxxDu@cluster0-nhmu0.mongodb.net/test?retryWrites=true&w=majority*/
router.put("/:id", (req, res, next) => {
  const city = new City({
    _id: req.body.id,
    cityName: req.body.cityName,
    landmark: req.body.landmark,
    pin: req.body.pin,
    manager: req.body.manager
  });
  City.updateOne({ _id: req.params.id }, city).then(result => {
    //console.log(result);
    res.status(200).json({ message: "Update Successful" });
  });
});

router.get("", (req, res, next) => {
  City.find().then(documents => {
    res.status(200).json({
      message: "Cities fetched successfully",
      cities: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  City.findById(req.params.id).then(city => {
    if (city) {
      res.status(200).json(city);
    } else {
      res.status(404).json({ message: "City not found" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  console.log(req.params.id);
  City.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "City deleted" });
  });
});

module.exports = router;
