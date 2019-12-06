const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const customerSchema = mongoose.Schema({
  customerId: { type: Number },
  customerName: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pin: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: false },
  gstNo: { type: String, required: false }
});

customerSchema.plugin(AutoIncrement, { inc_field: "customerId" });
module.exports = mongoose.model("Customer", customerSchema);
