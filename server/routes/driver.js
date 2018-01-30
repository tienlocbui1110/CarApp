var express = require("express");
var router = express.Router();
var Driver = require("../model/Drivers");

//Get Single Driver
router.get("/driver/:id", function(req, res, next) {
  Driver.findOne({ _id: req.params.id }, function(err, driver) {
    if (err) {
      res.send(err);
    }
    res.send(driver);
  });
});

module.exports = router;
