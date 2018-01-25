// Lib
var express = require("express");
var mongoose = require("mongoose");
// My module
var Bookings = require("../model/Bookings");
var config = require("../config");
// Setting
var router = express.Router();
mongoose.connect(config.mongoCarAppUri);
// router
router.get("/bookings", function(req, res, next) {
  Bookings.find({}, function(err, booking) {
    if (err) res.send(err);
    res.json(booking);
  });
});

router.post("/bookings", function(req, res, next) {
  var booking = req.body.data;
  if (!booking || !booking.userName) {
    res.status(400);
    res.json({
      error: "Bad data"
    });
  } else {
    var bookingData = new Bookings(booking);
    bookingData.save(function(err, newBooking) {
      if (err) {
        res.status(400);
        res.json({ error: "Bad data" });
      } else {
        res.json(newBooking);
      }
    });
  }
});
module.exports = router;
