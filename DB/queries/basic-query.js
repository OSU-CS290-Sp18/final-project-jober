var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";
var getCollections = require("../collections/get-collections");

var query = function(propVal, propType, collection) {
  new Promise((resolve, reject) => {
    MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
      if (err) throw err;
      var jober = db.db("jober");

      var query = {};
      query[propType] = propVal;
      jober.collection(collection).find(query).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          resolve(result);
          db.close();
        });
      // db.close();
    });
  })
}

query("jimmey coolio", "name", "employer");//.then(result => console.log(result));
