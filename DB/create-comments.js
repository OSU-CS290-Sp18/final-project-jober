var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var jober = db.db("jober");

  jober.createCollection("comments", function(err, res) {
    if (err) throw err;
    console.log("Collection 'comments' created!");
  });

  var comment = {
      author_id: "0001",
      author_name: "Mike L",
      timestamp: "May 25 2018 - 1:11am",
      text: "Ay howabout 60, seasoned dirtbag here"
            };

  jober.collection("comments").insertOne(comment, function(err, res) {
    if (err) throw err;
    console.log("1 comment created");
  });
  db.close();
});
