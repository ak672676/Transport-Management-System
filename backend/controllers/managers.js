const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Manager = require("../models/manager");

// exports.createManager = (req, res, next) => {
//   const url = req.protocol + "://" + req.get("host");
//   console.log("--->" + req.body.name);
//   const manager = new Manager({
//     name: req.body.name,
//     sex: req.body.sex,
//     phone: req.body.phone,
//     email: req.body.email,
//     address: req.body.address,
//     adharNo: req.body.adharNo,
//     password: req.body.password,
//     workingCity: req.body.workingCity,
//     imagePath: url + "/images/" + req.file.filename,
//     isAdmin: req.body.isAdmin
//   });
//   //console.log(req.body.title);
//   manager.save().then(createdManager => {
//     res.status(201).json({
//       message: "Manager added successfully",
//       manager: {
//         ...createdManager,
//         id: createdManager._id
//       }
//     });
//   });
// };

exports.createManager = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  console.log("--->" + req.body.name);
  bcrypt.hash(req.body.password, 10).then(hash => {
    const manager = new Manager({
      name: req.body.name,
      sex: req.body.sex,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      adharNo: req.body.adharNo,
      password: hash,
      workingCity: req.body.workingCity,
      imagePath: url + "/images/" + req.file.filename,
      isAdmin: req.body.isAdmin
    });

    manager.save().then(createdManager => {
      res.status(201).json({
        message: "Manager added successfully",
        manager: {
          ...createdManager,
          id: createdManager._id
        }
      });
    });

    console.log("SAVED IN BACKEND");
  });
  //console.log(req.body.title);
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
    password: req.body.password,
    workingCity: req.body.workingCity,
    imagePath: imagePath,
    isAdmin: req.body.isAdmin
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

// exports.updateManager = (req, res, next) => {
//   let imagePath = req.body.imagePath;
//   if (req.file) {
//     const url = req.protocol + "://" + req.get("host");
//     imagePath = url + "/images/" + req.file.filename;
//   }
//   bcrypt.hash(req.body.password, 10).then(hash => {
//     const manager = new Manager({
//       name: req.body.name,
//       sex: req.body.sex,
//       phone: req.body.phone,
//       email: req.body.email,
//       address: req.body.address,
//       adharNo: req.body.adharNo,
//       password: hash,
//       workingCity: req.body.workingCity,
//       imagePath: imagePath,
//       isAdmin: req.body.isAdmin
//     });

//     Manager.updateOne({ _id: req.params.id }, manager)
//       .then(result => {
//         if (result.n > 0) {
//           console.log("Updated");
//           res.status(200).json({ message: "Update successful!" });
//         } else {
//           res.status(401).json({ message: "Not Authorized" });
//         }
//       })
//       .catch(error => {
//         res.status(500).json({
//           message: "Couldn't update the post"
//         });
//       });
//   });
//   //console.log(req.body.title);
// };

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

exports.loginManager = (req, res, next) => {
  let fetchedManager;
  //console.log("1>SAVED IN BACKEND");
  console.log(req.body.email, req.body.password);
  Manager.findOne({ email: req.body.email })
    .then(manager => {
      if (!manager) {
        console.log("Mail Not Found");
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedManager = manager;
      console.log(bcrypt.compare(req.body.password, manager.password));
      return bcrypt.compare(req.body.password, manager.password);
    })
    .then(result => {
      console.log("RESULT is", result);
      if (!result) {
        console.log("2>Mail Not Found");
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      console.log("Befor token");
      console.log(fetchedManager.email);
      console.log(fetchedManager._id);
      console.log(process.env.JWT_KEY);
      const token = jwt.sign(
        { email: fetchedManager.email, managerId: fetchedManager._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      console.log(token);
      console.log("LOGIN IN BACKEND");
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        managerId: fetchedManager._id,
        city: fetchedManager.city,
        isAdmin: fetchedManager.isAdmin
      });
      console.log("LOGIN IN BACKEND");
    })
    .catch(err => {
      console.log("Error");
      return res.status(401).json({
        message: "Invalid authentication credentials"
      });
    });
};
