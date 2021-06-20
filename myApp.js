var express = require("express");
var bodyParser = require('body-parser');
var app = express();

let absolutePath = __dirname + "/views/index.html";
let assetsPath = __dirname + "/public";
app.use("/public", express.static(assetsPath));
app.use(bodyParser.urlencoded({extended: false}) );
app.use(bodyParser.json());

//logging before each request
app.use(function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// server html file
app.get("/", function (req, res) {
  res.sendFile(absolutePath);
});

//server json res
app.get("/json", function (req, res) {
  let response = "Hello json";
  if (process.env["MESSAGE_STYLE"] === "uppercase") {
    response = response.toUpperCase();
  }
  res.json({ message: response });
});

//route specific middleware and handler
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

//route parameter
app.get("/:word/echo", function (req, res) {
  res.json({ echo: req.params.word });
});

//query string parameter
app.get("/name", function (req, res) {
  let fname = req.query.first;
  let lname = req.query.last;
  res.json({ echo: req.params.word });
  res.json({ name: `${fname} ${lname}` });
});

//query string parameter
app.post("/name", function (req, res) {
  let fname = req.body.first;
  let lname = req.body.last;
  res.json({ name: `${fname} ${lname}` });
});



module.exports = app;
