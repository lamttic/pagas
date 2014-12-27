var express = require('express');
var path = require('path');
var http = require('http');
var app = express();
var mongo = require('./mongo');

// Set Express Environments
app.set('port', process.env.PORT||1337);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Http Server
http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening!!");
});

// Route Url
app.get('/', function(req, res) {
  mongo.find('testData', {}, function(docs) {
    res.send(docs);
  });
});
