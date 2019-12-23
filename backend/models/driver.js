const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const driverSchema = mongoose.Schema({
  driverId: { type: Number },
  name: { type: String, required: true },
  sex: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  drivingLic: { type: String, required: true },
  adharNo: { type: String, required: true },
  vehicleNo: { type: String, required: true },
  imagePath: { type: String, required: true }
});

driverSchema.plugin(AutoIncrement, { inc_field: "driverId" });
module.exports = mongoose.model("Driver", driverSchema);
