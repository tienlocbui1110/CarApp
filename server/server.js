var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var index = require("./routes/index");
var bookings = require("./routes/bookings");

var app = express();

// View

app.set("view engine", "ejs");

// Body parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

app.use("/", index);
app.use("/api", bookings);

var port = 3000;

app.listen(port, function() {
  console.log("Server is running..");
});
