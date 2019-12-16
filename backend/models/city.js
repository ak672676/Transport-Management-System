const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const citySchema = mongoose.Schema({
  cityId: { type: Number },
  landmark: { type: String, require: true },
  cityName: { type: String, require: true },
  state: { type: String, require: true },
  country: { type: String, require: true },
  pin: { type: String, require: true },
  phone: { type: String, require: true },
  billsForTheCity: [{ id: String, billId: String }]
});

citySchema.plugin(AutoIncrement, { inc_field: "cityId" });
module.exports = mongoose.model("City", citySchema);
