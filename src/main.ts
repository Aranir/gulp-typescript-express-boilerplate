/// <reference path="../typings/main.d.ts" />


import express = require("express")

console.log("it should reload every time 😉")

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!, right....');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});