// Mongo Connection URL
var mongoUrl = 'mongodb://localhost:27017/pagas';

var path = require('path');
var http = require('http');
var express = require('express');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

mongoose.connect(mongoUrl);

autoIncrement.initialize(mongoose);

// Define Mongo Model
var postSchema = new Schema({
  'text': String,
  'date': { type: Date, default: Date.now }
});

postSchema.plugin(autoIncrement.plugin, 'Post');
var Post = mongoose.model('post', postSchema);

var app = express();

// Set Express Environments
app.set('port', process.env.PORT||1337);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Http Server
http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening!!");
});

// Show Post List Page
app.get('/', function(req, res) {

  var post = new Post();
  post.text = 'a';
  post.save(function(err){
    if(err) console.log("Something went wrong while saving the thing");
    else console.log("Thing was successfully saved");
  });
  res.send('ok');
});

// Show Post Detail Page
app.get('/post/:id', function(req, res) {
});

// Show Add Post Page
app.get('/post/add', function(req, res) {
  res.send('Show Add Post');
});

// Do Add Post
app.post('/post/add', function(req, res) {
});
