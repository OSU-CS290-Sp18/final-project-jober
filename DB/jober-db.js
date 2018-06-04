var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var jober = db.db("jober");

  jober.createCollection("jobs", function(err, res) {
    if (err) throw err;
    console.log("Collection 'jobs' created!");
  });

  jober.createCollection("contractors", function(err, res) {
    if (err) throw err;
    console.log("Collection 'contractors' created!");
  });

  jober.createCollection("comments", function(err, res) {
    if (err) throw err;
    console.log("Collection 'comments' created!");
  });

  var contractor = {
                    author_name: "Mike L",
                    skills: ["fencing, thugging"],
                    availability: "Mon - Fri"
                  };
  jober.collection("contractors").insertOne(contractor, function(err, res) {
    if (err) throw err;
    console.log("1 contractor created");
  });

  var job = {
        author_id: "0001",
        author_name: "jimmey cool",
        title: "Need someone who is okay to perfrom illegal activities",
    		price: "$20-$50",
    		timestamp: "May 25 2018 - 1:02am",
    		description: "I gotta take care of my side hustle stuff, must be down to do some of that hoodrat shit",
        skills: ["fencing", "thieving", "thugging"],
        comments: [] //fill with comment id's
            };
  jober.collection("jobs").insertOne(job, function(err, res) {
    if (err) throw err;
    console.log("1 job created");
    db.close();
  });
  var comment = {
      author_id: "0001",
      author_name: "Mike L",
      timestamp: "May 25 2018 - 1:11am",
      text: "Ay howabout 60, seasoned dirtbag here"
            };
  jober.collection("comments").insertOne(job, function(err, res) {
    if (err) throw err;
    console.log("1 job created");
    db.close();
  });
});



// MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
//   if (err) throw err;
//   var jober = db.db("jober");
//
//   jober.listCollections().toArray(function(err, collections){
//       console.log(collections);
//   });
//
//   jober.collection("jobs").find({}).toArray(function(err, result) {
//       if (err) throw err;
//       console.log(result);
//     });
//
//   db.close();
// });
