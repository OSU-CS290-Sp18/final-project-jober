var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

console.log(process.argv);
MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var jober = db.db("jober");


  jober.collection("contractors", function(err, collection) {
      if (err) throw err;
      collection.remove({}, function(err, result){
          if (err) throw err;
          console.log("Collection is deleted! "+result);
      });
  });

  jober.collection("jobs", function(err, collection) {
      if (err) throw err;
      collection.remove({}, function(err, result){
          if (err) throw err;
          console.log("Collection is deleted! "+result);
      });
  });

  jober.collection("comments", function(err, collection) {
      if (err) throw err;
      collection.remove({}, function(err, result){
          if (err) throw err;
          console.log("Collection is deleted! "+result);
      });
  });

  db.close();
});
