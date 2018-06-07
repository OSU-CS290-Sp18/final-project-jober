var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";
var DB = require('./DB-interface');
var dummy = require('./dummy/dummy-data');

MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var jober = db.db("jober");

  jober.collection("comments").insertOne(dummy.comment, function(err, res) {
    if (err) throw err;
    console.log("1 comment created");
    db.close();
  });
  jober.collection("contractors").insertOne(dummy.contractor, function(err, res) {
    if (err) throw err;
    console.log("1 contractor created");
  });
  jober.collection("jobs").insertOne(dummy.job, function(err, res) {
    if (err) throw err;
    console.log("1 job created");
    db.close();
  });
  jober.collection("employers").insertOne(dummy.employer, function(err, res) {
    if (err) throw err;
    console.log("1 employer created");
    db.close();
  });
});
