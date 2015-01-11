// Mongo Connection URL
var mongoUrl = 'mongodb://localhost:27017/pagas';

var path = require('path');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

mongoose.connect(mongoUrl);

autoIncrement.initialize(mongoose);

// Define Mongo Model
var postSchema = new Schema({
  'title': String,
  'user': String,
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
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// Initialize Http Server
http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening!!");
});

// Show Add Post Page
app.get('/post/add', function(req, res) {
  res.render('post/add');
});

// Do Add Post
app.post('/post/add', function(req, res) {
  var post = new Post();
  post.title = req.body.title;
  post.user = req.body.user;
  post.text = req.body.text;
  post.save(function(err, result){
    if(err) {
      res.send('Something went wrong while saving the thing');
    } else {
      console.log("Thing was successfully saved");
      res.redirect('/post/' + result._id);
    }
  });
});

// Show Post Detail Page
app.get('/post/:id', function(req, res) {
  Post.findOne({'_id': req.params.id}, function(err, post) {
    res.render('post/show', {post: post});
  });
});

// Show Post List Page
app.get('/', function(req, res) {
  Post.find({}, function(err, posts) {
    res.render('index', {posts: posts});
  });
});
