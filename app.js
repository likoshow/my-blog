//app.js
var express = require('express');
var fs = require('fs');
var marked = require('marked');
var app = express();


app.get('/', function(req, res) {
  fs.readdir('./blogs', function (err, files) {
    if (err) res.send(err);

    fs.readFile('./index.html','utf-8', function (err, html) {
      if (err) res.send(err);

      var lis = files.map(function (filename) {
        var file = filename.split('.')[0]

        return '<li><a href="/blog/' + file +'">' + file +'</a></li>'
      })

      var ulHtml = '<ul>' + lis.join('') +'</ul>'
      res.send(html.replace('REPLACE_STRING', ulHtml))
    })
  })
});

app.get('/blog/:title', function (req, res) {
  console.log(req.params.title);
  var title = req.params.title
  fs.readFile('./blogs/' + title + '.md','utf-8', function (err, data) {
    if (err) res.send('Not Found: ' + title);
    res.send(marked(data));
  });
  //blog page
});
app.get('*', function(req, res) {
  res.send('Not Found');

});
app.listen(80);
console.log('server is running at 3000!');
