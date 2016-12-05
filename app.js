//app.js
var express = require('express');
var fs = require('fs');
var marked = require('marked');
var markdown = require( "markdown" ).markdown;


var app = express();


var htmlWrap = ''
try {
  htmlWrap = fs.readFileSync('./index.html','utf-8');
} catch (e) {
  throw e
  return
}

app.use(express.static('public'));

app.get('/', function(req, res) {
  fs.readdir('./blogs', function (err, files) {
    if (err) res.send(err);

    var lis = files.map(function (filename) {
      var file = filename.split('.')[0]

      return '<li><a href="/blog/' + file +'">' + file +'</a></li>'
    })

    var ulHtml = '<ul>' + lis.join('') +'</ul>'
    res.send(htmlWrap.replace('REPLACE_STRING', ulHtml))
  })
});

app.get('/blog/:title', function (req, res) {

  var title = req.params.title
  fs.readFile('./blogs/' + title + '.md','utf-8', function (err, data) {
    if (err) res.send('Not Found: ' + title);

    res.send(htmlWrap.replace('REPLACE_STRING', markdown.toHTML(data)));

  });
  //blog page
});
app.get('*', function(req, res) {
  res.send('Not Found');

});
app.listen(80);
console.log('server is running at 80!');
