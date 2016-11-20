//app.js
var express = require('express');
var fs = require('fs');
var app = express();


app.get('/', function(req, res) {
  fs.readFile('./blogs/test.md','utf-8', function (err, data) {
    if (err) res.send(err);
    res.send(data);
    console.log(data);
  });
});

app.listen(3000);
console.log('server is running at 3000!');
