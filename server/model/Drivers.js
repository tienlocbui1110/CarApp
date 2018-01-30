var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DriverSchema = new Schema({
  firstName: String,
  lastName: String,
  dob: String,
  nationalId: String,
  profilePic: String,
  rating: Number,
  address: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    zipCode: Number
  },
  vehicle: {
    bodyType: String,
    model: String,
    plateNumber: String,
    color: String
  }
});

module.exports = mongoose.model("Driver", DriverSchema);
