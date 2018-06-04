var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";

console.log(process.argv);
MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var jober = db.db("jober");

  jober.collection("contractors", function(err, collection) {
      if (err) throw err;
      collection.drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
      });
  });

  jober.collection("jobs", function(err, collection) {
      if (err) throw err;
      collection.drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
      });
  });

  jober.collection("comments", function(err, collection) {
      if (err) throw err;
      collection.drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
      });
  });

  db.close();
});
