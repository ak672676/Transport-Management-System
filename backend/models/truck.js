const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const truckSchema = mongoose.Schema({
  truckId: { type: Number },
  make: { type: String, require: true },
  model: { type: String, require: true },
  chassisNo: { type: String, require: true },
  vehicleNo: { type: String, require: true },
  insCompany: { type: String, require: true },
  insNumber: { type: String, require: true },
  lastServiceDate: { type: String, require: true },
  driverName: { type: String, require: true },
  driverId: { type: String, require: true },
  billsForTheTruck: [{ id: String, billId: String }]
});

truckSchema.plugin(AutoIncrement, { inc_field: "truckId" });
module.exports = mongoose.model("Truck", truckSchema);
