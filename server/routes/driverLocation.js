// Lib
var express = require("express");
// My module
DriverLocation = require("../model/DriverLocation");
// Setting
var router = express.Router();
// router
// update driver socket ID
router.put("/driverLocationSocket/:id", function(req, res, next) {
  var io = req.app.io;
  if (!req.body) {
    res.status(400);
    res.json({
      error: "Bad data"
    });
  } else {
    DriverLocation.findById(req.params.id, function(err, foundDriverLocation) {
      if (err) res.send("update failed");
      foundDriverLocation.socketId = req.body.socketId;
      foundDriverLocation.save(function(err, updatedDriverLocation) {
        if (err) res.send(err);
        else res.send(foundDriverLocation);
      });
    });
  }
});

// get nearby driver
router.get("/driverLocation", function(req, res, next) {
  DriverLocation.find(
    {
      coordinate: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [
              parseFloat(req.query.longitude),
              parseFloat(req.query.latitude)
            ]
          },
          $maxDistance: 10000
        }
      }
    },
    function(err, location) {
      if (err) res.send(err);
      else res.send(location);
    }
  );
});

//Get Single Driver and emit track by user to driver
router.get("/driverLocation/:id", function(req, res, next) {
  var io = req.app.io;
  DriverLocation.findOne({ driverId: req.params.id }, function(err, location) {
    if (err) {
      res.send(err);
    }
    res.send(location);
    io.emit("trackDriver", location);
  });
});

//Update Location by driver to user
router.put("/driverLocation/:id", function(req, res, next) {
  var io = req.app.io;
  var location = req.body;
  var latitude = parseFloat(location.latitude);
  var longitude = parseFloat(location.longitude);
  if (!location) {
    res.status(400);
    res.json({
      error: "Bad Data"
    });
  } else {
    DriverLocation.findOne({ _id: req.params.id }, function(
      err,
      foundDriverLocation
    ) {
      // Update
      foundDriverLocation.socketId = location.socketId;
      foundDriverLocation.coordinate = {
        type: "Point",
        coordinates: [longitude, latitude]
      };
      // Save
      foundDriverLocation.save(function(err, updatedLocation) {
        if (err) {
          res.send(err);
        }
        if (updatedLocation) {
          //Get updated location
          DriverLocation.findOne({ _id: req.params.id }, function(
            error,
            gotUpdatedLocation
          ) {
            if (error) {
              res.send(error);
            }
            res.send(gotUpdatedLocation);
            io.emit("action", {
              type: "UPDATE_DRIVER_LOCATION",
              payload: gotUpdatedLocation
            });
          });
        }
      });
    });
  }
});
module.exports = router;
