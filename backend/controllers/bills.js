const nodemailer = require("nodemailer");

const Bill = require("../models/bill");
const City = require("../models/city");

var transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false, //true
  port: 465, //25
  auth: {
    user: "tms796677@gmail.com",
    pass: "Tmsamit123@"
  },
  tls: {
    rejectUnauthorized: false
  }
});

exports.createBill = (req, res, next) => {
  // const url = req.protocol + "://" + req.get("host");
  const bill = new Bill({
    billId: req.body.billId,
    customerUniqueId: req.body.customerUniqueId,
    customerId: req.body.customerId,
    customerName: req.body.customerName,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    pin: req.body.pin,
    phone: req.body.phone,
    email: req.body.email,
    gstNo: req.body.gstNo,
    recieverUniqueId: req.body.recieverUniqueId,
    r_customerId: req.body.r_customerId,
    r_customerName: req.body.r_customerName,
    r_street: req.body.r_street,
    r_city: req.body.r_city,
    r_state: req.body.r_state,
    r_country: req.body.r_country,
    r_pin: req.body.r_pin,
    r_phone: req.body.r_phone,
    r_email: req.body.r_email,
    r_gstNo: req.body.r_gstNo,
    bookingDate: req.body.bookingDate,
    bookingStatus: req.body.bookingStatus,
    routeCovered: req.body.routeCovered.splice(0, req.body.routeCovered.length),
    items: req.body.items.splice(0, req.body.items.length),
    total: req.body.total
  });
  //console.log(req.body.items.splice(0, req.body.items.length));
  // console.log("_____________________________");
  console.log("bill", bill);

  bill.save().then(createdBill => {
    // console.log(createdBill);
    // console.log("================================");
    City.findOne({ cityName: createdBill.city }).then(city => {
      if (city) {
        console.log("This is the city to Fill the BillId", city);
        //const billsList = [...city.billsForTheCity];
        //billsList.push({ id: createdBill._id, billId: createdBill.billId });
        // const updatedCity = new City({
        //   _id: city._id,
        //   cityId: city.cityId,
        //   landmark:city.landmark,
        //   cityName:city.cityName,
        //   state:city.state,
        //   country:city.country,
        // });
        city.billsForTheCity.push({
          id: createdBill._id,
          billId: createdBill.billId
        });
        City.updateOne({ _id: city._id }, city)
          .then(result => {
            if (result.n > 0) {
              var mailOptions = {
                from: "tms796677@gmail.com",
                to: "akumar672676@gmail.com",
                subject: "Billing TMS",
                text: `Hii.. ${bill.customerName} your bill amount is ${bill.total}`
              };
              transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });

              res.status(201).json({
                message: "Bill added Successfuly",
                bill: {
                  ...createdBill,
                  id: createdBill._id,
                  customerUniqueId: createdBill.customerUniqueId,
                  recieverUniqueId: createdBill.recieverUniqueId,
                  billId: createdBill.billId
                }
              });

              console.log("FROM BACEND UPDATES THE BACKEND");
            } else {
              res.status(401).json({ message: "Not Authorized" });
            }
          })
          .catch(error => {
            res.status(500).json({
              message: "Couldn't update the bill"
            });
          });
      }
    });
  });
};

exports.getBills = (req, res, next) => {
  console.log("GETTING DATA");
  Bill.find()
    .then(document => {
      res.status(200).json({
        message: "Bills fetched Successfully",
        bills: document
      });
      console.log(document);
    })
    .catch(error => {
      res.status(500).json({
        message: "Could not fetch the bill"
      });
    });
};

exports.getBill = (req, res, next) => {
  Bill.findById(req.params.id)
    .then(bill => {
      if (bill) {
        console.log(bill);
        res.status(200).json(bill);
      } else {
        res.status(404).json({ message: "Bill not found" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching bill Failed"
      });
    });
};

exports.updateBill = (req, res, next) => {
  const bill = new Bill({
    _id: req.body.id,
    billId: req.body.billId,
    customerUniqueId: req.body.customerUniqueId,
    customerId: req.body.customerId,
    customerName: req.body.customerName,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    pin: req.body.pin,
    phone: req.body.phone,
    email: req.body.email,
    gstNo: req.body.gstNo,
    recieverUniqueId: req.body.recieverUniqueId,
    r_customerId: req.body.r_customerId,
    r_customerName: req.body.r_customerName,
    r_street: req.body.r_street,
    r_city: req.body.r_city,
    r_state: req.body.r_state,
    r_country: req.body.r_country,
    r_pin: req.body.r_pin,
    r_phone: req.body.r_phone,
    r_email: req.body.r_email,
    r_gstNo: req.body.r_gstNo,
    bookingDate: req.body.bookingDate,
    bookingStatus: req.body.bookingStatus,
    routeCovered: req.body.routeCovered.splice(0, req.body.routeCovered.length),
    items: req.body.items.splice(0, req.body.items.length),
    total: req.body.total
  });

  Bill.updateOne({ _id: req.params.id }, bill)
    .then(result => {
      if (result.n > 0) {
        console.log("Updated Bill");
        console.log(bill);
        res.status(200).json({ message: "Update Successful" });
      } else {
        res.status(401).json({ message: "Not Authorized" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Could not update the bill"
      });
    });
};

exports.updateBillCity = (req, res, next) => {
  console.log("------------->", req.body.bill);
  console.log("------------->", req.body.cityToUpdate);

  const bill = new Bill({
    _id: req.body.bill.id,
    billId: req.body.bill.billId,
    customerUniqueId: req.body.bill.customerUniqueId,
    customerId: req.body.bill.customerId,
    customerName: req.body.bill.customerName,
    street: req.body.bill.street,
    city: req.body.bill.city,
    state: req.body.bill.state,
    country: req.body.bill.country,
    pin: req.body.bill.pin,
    phone: req.body.bill.phone,
    email: req.body.bill.email,
    gstNo: req.body.bill.gstNo,
    recieverUniqueId: req.body.bill.recieverUniqueId,
    r_customerId: req.body.bill.r_customerId,
    r_customerName: req.body.bill.r_customerName,
    r_street: req.body.bill.r_street,
    r_city: req.body.bill.r_city,
    r_state: req.body.bill.r_state,
    r_country: req.body.bill.r_country,
    r_pin: req.body.bill.r_pin,
    r_phone: req.body.bill.r_phone,
    r_email: req.body.bill.r_email,
    r_gstNo: req.body.bill.r_gstNo,
    bookingDate: req.body.bill.bookingDate,
    bookingStatus: req.body.bill.bookingStatus,
    routeCovered: req.body.bill.routeCovered.splice(
      0,
      req.body.bill.routeCovered.length
    ),
    items: req.body.bill.items.splice(0, req.body.bill.items.length),
    total: req.body.total
  });

  Bill.updateOne({ _id: req.body.bill.id }, bill).then(createdBill => {
    City.findOne({ cityName: req.body.cityToUpdate }).then(city => {
      if (city) {
        city.billsForTheCity.push({
          id: req.body.bill.id,
          billId: req.body.bill.billId
        });
        City.findOne({ cityName: req.body.cityToRemoveBill }).then(
          cityBillRemove => {
            if (cityBillRemove) {
              let k = null;
              for (let i = 0; i < cityBillRemove.billsForTheCity.length; i++) {
                if (cityBillRemove.billsForTheCity[i].id === req.body.bill.id) {
                  k = i;
                  break;
                }
              }
              if (k != null) {
                let removedBill = cityBillRemove.billsForTheCity.splice(k, 1);
                City.updateOne(
                  { _id: cityBillRemove._id },
                  cityBillRemove
                ).then(result => {
                  if (result.n > 0) {
                    console.log("Successfully Changed the Bill and City");
                  }
                });
              }
            }
          }
        );
        City.updateOne({ _id: city._id }, city)
          .then(result => {
            if (result.n > 0) {
              res.status(201).json({
                message: "Bill added Successfuly",
                bill: {
                  ...createdBill,
                  id: createdBill._id,
                  customerUniqueId: createdBill.customerUniqueId,
                  recieverUniqueId: createdBill.recieverUniqueId,
                  billId: createdBill.billId
                }
              });
              console.log("FROM BACEND UPDATES THE BACKEND");
            } else {
              res.status(401).json({ message: "Not Authorized" });
            }
          })
          .catch(error => {
            res.status(500).json({
              message: "Couldn't update the post"
            });
          });
      }
    });
  });
};
// exports.createBill = (req, res, next) => {
//   // const url = req.protocol + "://" + req.get("host");
//   const bill = new Bill({
//     billId: req.body.billId,
//     customerUniqueId: req.body.customerUniqueId,
//     customerId: req.body.customerId,
//     customerName: req.body.customerName,
//     street: req.body.street,
//     city: req.body.city,
//     state: req.body.state,
//     country: req.body.country,
//     pin: req.body.pin,
//     phone: req.body.phone,
//     email: req.body.email,
//     gstNo: req.body.gstNo,
//     recieverUniqueId: req.body.recieverUniqueId,
//     r_customerId: req.body.r_customerId,
//     r_customerName: req.body.r_customerName,
//     r_street: req.body.r_street,
//     r_city: req.body.r_city,
//     r_state: req.body.r_state,
//     r_country: req.body.r_country,
//     r_pin: req.body.r_pin,
//     r_phone: req.body.r_phone,
//     r_email: req.body.r_email,
//     r_gstNo: req.body.r_gstNo,
//     bookingDate: req.body.bookingDate,
//     bookingStatus: req.body.bookingStatus,
//     routeCovered: req.body.routeCovered.splice(0, req.body.routeCovered.length),
//     items: req.body.items.splice(0, req.body.items.length)
//   });
//   //console.log(req.body.items.splice(0, req.body.items.length));
//   // console.log("_____________________________");
//   console.log("bill", bill);

//   bill.save().then(createdBill => {
//     console.log(createdBill);
//     res.status(201).json({
//       message: "Bill added Successfuly",
//       bill: {
//         ...createdBill,
//         id: createdBill._id,
//         customerUniqueId: createdBill.customerUniqueId,
//         recieverUniqueId: createdBill.recieverUniqueId,
//         billId: createdBill.billId
//       }
//     });
//   });
// };
exports.getSearchBill = (req, res, next) => {
  // console.log("GETTING DATA");
  //Customer.find({ phone: { $regex: /req.params.phone/ } })
  console.log("-->", req.params.billId);
  Bill.find({ billId: req.params.billId })
    .then(document => {
      res.status(200).json({
        message: "Bill fetched Successfully",
        bills: document
      });
      console.log(document);
    })
    .catch(error => {
      res.status(500).json({
        message: "Could not fetch the bill"
      });
    });
};
