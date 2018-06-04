var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var jober = db.db("jober");

  var query = { "_id": ObjectId("5b14a11f3d586f3364cdffdf") };

  jober.collection("jobs").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
  });
  db.close();
});
