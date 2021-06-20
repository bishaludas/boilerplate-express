var express = require("express");
var app = express();

let absolutePath = __dirname + "/views/index.html";
let assetsPath = __dirname + "/public";
app.use("/public", express.static(assetsPath));

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
app.post("/name", function (req, res) {
    let uname = "";
    if (req.query.first && req.query.last) {
        uname= `${req.query.first} ${req.query.last}`
    }
  res.json({ name: uname});
});


module.exports = app;
