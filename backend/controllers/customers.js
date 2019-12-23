const Customer = require("../models/customer");

exports.createCustomer = (req, res, next) => {
  //const url = req.protocol + "://" + req.get("host");
  const customer = new Customer({
    customerId: req.body.customerId,
    customerName: req.body.customerName,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    pin: req.body.pin,
    phone: req.body.phone,
    email: req.body.email,
    gstNo: req.body.gstNo
  });

  customer.save().then(createdCustomer => {
    console.log(createdCustomer);
    res.status(201).json({
      message: "Customer added Successfuly",
      customer: {
        ...createdCustomer,
        id: createdCustomer._id,
        customerId: createdCustomer.customerId
      }
    });
  });
};

exports.updateCustomer = (req, res, next) => {
  const customer = new Customer({
    _id: req.body.id,
    customerId: req.body.customerId,
    customerName: req.body.customerName,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    pin: req.body.pin,
    phone: req.body.phone,
    email: req.body.email,
    gstNo: req.body.gstNo
  });

  Customer.updateOne({ _id: req.params.id }, customer)
    .then(result => {
      if (result.n > 0) {
        console.log("Updated Customer");
        res.status(200).json({ message: "Update Successful" });
      } else {
        res.status(401).json({ message: "Not Authorized" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Could not update the customer"
      });
    });
};

exports.getCustomers = (req, res, next) => {
  console.log("GETTING DATA");
  Customer.find()
    .then(document => {
      res.status(200).json({
        message: "Customer fetched Successfully",
        customers: document
      });
      console.log(document);
    })
    .catch(error => {
      res.status(500).json({
        message: "Could not fetch the customer"
      });
    });
};

exports.getCustomer = (req, res, next) => {
  Customer.findById(req.params.id)
    .then(customer => {
      if (customer) {
        console.log(customer);
        res.status(200).json(customer);
      } else {
        res.status(404).json({ message: "Customer not found" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Customer Failed"
      });
    });
};

exports.deleteCustomer = (req, res, next) => {
  console.log("In backend delete");
  Customer.deleteOne({ _id: req.params.id })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Customer Delete" });
      } else {
        res.status(401).json({ message: "Not Authorized" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Customer Failed"
      });
    });
};

exports.getSearchCustomer = (req, res, next) => {
  // console.log("GETTING DATA");
  //Customer.find({ phone: { $regex: /req.params.phone/ } })

  Customer.find({ phone: req.params.phone })
    .then(document => {
      res.status(200).json({
        message: "Customer fetched Successfully",
        customers: document
      });
      console.log(document);
    })
    .catch(error => {
      res.status(500).json({
        message: "Could not fetch the customer"
      });
    });
};
