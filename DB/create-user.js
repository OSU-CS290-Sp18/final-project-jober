var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var jober = db.db("jober");

  jober.createCollection("contractors", function(err, res) {
    if (err) throw err;
    console.log("Collection 'contractors' created!");
  });

  var contractor = {
        author_name: "Mike L",
        skills: ["fencing", "thugging"],
        availability: "Mon - Fri",
        comments: [],
        jobs: []
                  };


  jober.collection("contractors").insertOne(contractor, function(err, res) {
    if (err) throw err;
    console.log("1 contractor created");
  });

  db.close();
});
