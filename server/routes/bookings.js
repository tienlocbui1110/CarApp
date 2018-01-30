// Lib
var express = require("express");

// My module
var Bookings = require("../model/Bookings");

// Setting
var router = express.Router();

// router
router.get("/bookings", function(req, res, next) {
  Bookings.find({}, function(err, booking) {
    if (err) res.send(err);
    res.json(booking);
  });
});

router.post("/bookings", function(req, res, next) {
  var booking = req.body.data;
  var io = req.app.io;
  var nearbyDriver = req.body.data.nearbyDriver;
  console.log(nearbyDriver);
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
        if (nearbyDriver.socketId) {
          io.emit(nearbyDriver.socketId + "driverRequest", newBooking);
        } else {
          console.log("Driver not connected");
        }
      }
    });
  }
});

// Driver  Update Booking done on driver side
router.put("/bookings/:id", function(req, res, next) {
  var io = req.app.io;
  var booking = req.body;
  if (!booking.status) {
    res.status(400);
    res.json({
      error: "Bad Data"
    });
  } else {
    Bookings.findOne({ _id: req.params.id }, function(err, foundBooking) {
      foundBooking.driverId = booking.driverId;
      foundBooking.status = booking.status;
      foundBooking.save(function(err, savedBooking) {
        if (err) {
          res.send(err);
        }
        if (savedBooking) {
          //Get Confirmed booking
          Bookings.findOne({ _id: req.params.id }, function(
            error,
            confirmedBooking
          ) {
            if (error) {
              res.send(error);
            }
            res.send(confirmedBooking);
            io.emit("action", {
              type: "BOOKING_CONFIRMED",
              payload: confirmedBooking
            });
          });
        }
      });
    });
  }
});

module.exports = router;
