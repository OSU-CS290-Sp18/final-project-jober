var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var getCollections = require("./get-collections");

// console.log(process.argv);
MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var jober = db.db("jober");

  getCollections.collect.then(function(res) {
    res.forEach(function(element){
      // console.log(element.name);
      jober.collection(element.name, function(err, collection) {
        if (err) throw err;
        collection.remove({}, function(err, result){
          if (err) throw err;
          console.log(element.name+" is emptied! "+result);
          db.close();
        });
      });
    })
  });
});
