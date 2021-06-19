var express = require('express');
var app = express();

let absolutePath = __dirname + '/views/index.html';
let assetsPath = __dirname + '/public';

app.use('/public',express.static(assetsPath));

app.get('/', function(req, res) {
  res.sendFile(absolutePath)
})

app.get('/json', function(req, res) {
  res.json({"message": "Hello json"});
})

































 module.exports = app;
