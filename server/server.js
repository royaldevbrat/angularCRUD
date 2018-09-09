var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;
var DB_URL = 'mongodb://testuser:testpwd1@ds251022.mlab.com:51022/comments';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','html');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

mongoose.connect(DB_URL);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ');
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

//Define Schema
var commentSchema = new mongoose.Schema({
    name: String,
    description: String,
    postedOn: {type: Date, default: Date.now()},
  });
  
var Comments = mongoose.model('Comments',commentSchema);

// Post request to add a comment
app.post('/addComments',function(req, res){
        var comment = new Comments({
            name: req.body.name,
            description: req.body.description
          });
          comment.save(function(err, detail) {
              if (err){
                  console.log(err);
                  res.json({ success :false});
              } else{
                res.json({ success :true, feed: detail}) ;
              }
          });
});

// Post request to delete a comment
app.post('/deleteComment', function (req, res) {
    Comments.remove({ "_id": ObjectId(req.body.cid)}, function (err, detail) {
        if (err) {
            console.log(err);
            res.json({ success: false });
        } else {
            res.json({ success: true });
        }
    });
});

// Get request to fetch all comments
app.get('/fetchAllComment',function(req, res){
    var query = {  };
    Comments.find(query, function(err, commentDet) {
        if (err){
            console.log(err);
            res.json({ success: false });
        } else{
            res.json({ success: true, comments: commentDet}) ;
        }
    });
});


app.listen(3000,function(){
    console.log('server is running on: 3000');
});