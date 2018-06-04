var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";

var methods = {};

methods.getCollections = function() {

  MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
    if (err) throw err;
    var jober = db.db("jober");
    jober.listCollections().toArray(function(err, collections){
      if (err) throw err;
      for (var i = 0; i < collections.length; i++){
        if (collections[i].name.includes("system") )
          collections.splice(i,1);
        // console.log(collections[i]);
      }
      return collections;
    });

    db.close();
  });

}

var blank = function(){ console.log(methods.getCollections());}

console.log(blank());

exports.data = methods;
