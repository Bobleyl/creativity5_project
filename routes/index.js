var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB',{ useNewUrlParser: true }); //Connects to a mongo database called "commentDB"

var commentSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Comment: String,
    Pay: String
});

var Comment = mongoose.model('Comment', commentSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});

router.post('/comment', function(req, res, next) {
  console.log("POST comment route"); 
  console.log(req.body); 
  var newcomment = new Comment(req.body); 
  console.log(newcomment); 
  newcomment.save(function(err, post) { 
    if (err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});

router.get('/comment', function(req, res, next) {
  console.log("In query route");
  console.log(req.body);
  console.log("Request");
  var requestname = req.query["q"];
  console.log(requestname);
  console.log("flag");
  var obj = {};
  if(requestname){
    obj = { Name:requestname };
    Comment.find(obj, function(err, list) {
      console.log(list);
      res.json(list);
    })
  } else{
    Comment.find({}, function(err, list) {
      console.log(list);
      res.json(list);
    })
  }
});

router.get('/rate', function(req, res, next) {
  console.log("In query route");
  console.log(req.body);
  console.log("Rate Function");
  var requestrate = req.query["q"];
  console.log(requestrate);
  console.log("flag");
  var obj = {};
  if(requestrate){
    obj = { Pay:requestrate };
    Comment.find(obj, function(err, list) {
      console.log(list);
      res.json(list);
    })
  } else{
    Comment.find({}, function(err, list) {
      console.log(list);
      res.json(list);
    })
  }
});

router.delete('/delete', function(req, res, next) {
  console.log("deleted comments");
  Comment.deleteMany({}, function(err){
    if(err){
      console.log("you did something wrong");
    }else{
      res.sendStatus(200);
    }
  });
});

module.exports = router;