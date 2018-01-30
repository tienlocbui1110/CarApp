var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var index = require("./routes/index");
var bookings = require("./routes/bookings");
var driver = require("./routes/driver");
var driverLocation = require("./routes/driverLocation");
var app = express();

var socket = require("socket.io");
var io = socket();

var config = require("./config");

// View

app.set("view engine", "ejs");

// Body parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mongoose
mongoose.connect(config.mongoCarAppUri);
mongoose.set("debug", true);

// Routes

app.use("/", index);
app.use("/api", bookings);
app.use("/api", driverLocation);
app.use("/api", driver);

var port = 3000;

io.listen(
  app.listen(port, function() {
    console.log("Server is running..");
  })
);

app.io = io.on("connection", function(socket) {
  console.log("Socket connected: " + socket.id);
});
