const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
  name: { type: String, required: true },
  sex: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  drivingLic: { type: String, required: true },
  adharNo: { type: String, required: true },
  vehicleNo: { type: String, required: true },
  imagePath: { type: String, required: true }
});

module.exports = mongoose.model("Driver", driverSchema);
