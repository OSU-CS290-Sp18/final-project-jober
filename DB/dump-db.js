var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var jober = db.db("jober");
  jober.listCollections().toArray(function(err, collections){
    if (err) throw err;
    console.log(collections);
  });
  jober.collection("jobs").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
  });
  jober.collection("contractors").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
  });
  jober.collection("comments").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
  });
  db.close();
});
