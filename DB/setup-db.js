var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var jober = db.db("jober");

  jober.createCollection("jobs", function(err, res) {
    if (err) throw err;
    console.log("Collection 'jobs' created!");
    db.close();
  });

  jober.createCollection("contractors", function(err, res) {
    if (err) throw err;
    console.log("Collection 'contractors' created!");
    db.close();
  });

  jober.createCollection("employers", function(err, res) {
    if (err) throw err;
    console.log("Collection 'employers' created!");
    db.close();
  });

  jober.createCollection("comments", function(err, res) {
    if (err) throw err;
    console.log("Collection 'comments' created!");
    db.close();
  });

});
