var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DriverLocationSchema = new Schema({
  driverId: String,
  coordinate: {
    type: { type: String, index: true },
    coordinates: [Number]
  },
  socketId: String
});
DriverLocationSchema.index({ coordinate: "2dsphere" });

module.exports = mongoose.model("DriverLocation", DriverLocationSchema);
