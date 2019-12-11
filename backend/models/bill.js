const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const billSchema = mongoose.Schema({
  billId: { type: Number },
  customerUniqueId: { type: String },
  customerId: { type: String, required: true },
  customerName: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pin: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: false },
  gstNo: { type: String, required: false },
  recieverUniqueId: { type: String },
  r_customerId: { type: String, required: true },
  r_customerName: { type: String, required: true },
  r_street: { type: String, required: true },
  r_city: { type: String, required: true },
  r_state: { type: String, required: true },
  r_country: { type: String, required: true },
  r_pin: { type: String, required: true },
  r_phone: { type: String, required: true },
  r_email: { type: String, required: false },
  r_gstNo: { type: String, required: false },
  bookingDate: { type: String },
  bookingStatus: { type: String },
  routeCovered: [{ city: String, time: String, date: String }],
  items: [{ description: String, numberOfPackage: String, cost: String }]
});

billSchema.plugin(AutoIncrement, { inc_field: "billId" });
module.exports = mongoose.model("Bill", billSchema);
