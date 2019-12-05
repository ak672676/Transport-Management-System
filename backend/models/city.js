const mongoose = require("mongoose");

const citySchema = mongoose.Schema({
  cityName: { type: String, require: true },
  landmark: { type: String, require: true },
  pin: { type: String, require: true },
  manager: { type: String, require: true }
});

module.exports = mongoose.model("City", citySchema);
