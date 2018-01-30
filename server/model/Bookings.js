var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BookingsSchema = new Schema({
  userName: String,
  pickUp: {
    address: String,
    name: String,
    latitude: Number,
    longitude: Number
  },
  dropOff: {
    address: String,
    name: String,
    latitude: Number,
    longitude: Number
  },
  fare: Number,
  status: String,
  driverId: String
});

module.exports = mongoose.model("Bookings", BookingsSchema);
