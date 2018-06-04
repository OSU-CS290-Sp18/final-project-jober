var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var getCollections = require("../collections/get-collections");
var url = "mongodb://localhost:27017/";

// console.log(process.argv);

MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var jober = db.db("jober");

  getCollections.collect.then(function(res) {
    res.forEach(function(element){
      // console.log(element.name);
      jober.collection(element.name, function(err, collection) {
        if (err) throw err;
        collection.find({}).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
        });
      });
    })
  });
});
