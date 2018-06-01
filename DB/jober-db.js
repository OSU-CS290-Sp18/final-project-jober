var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var jober = db.db("jober");

  jober.createCollection("jobs", function(err, res) {
    if (err) throw err;
    console.log("Collection 'jobs' created!");
    db.close();
  });

  jober.createCollection("contractors", function(err, res) {
    if (err) throw err;
    console.log("Collection 'contractors' created!");
    db.close();
  });

  var contractor = {
                    name: "Joe Smith",
                    skills: "fence painting, painting",
                    availability: "Mon - Fri"
                  };
  jober.collection("contractors").insertOne(contractor, function(err, res) {
    if (err) throw err;
    console.log("1 contractor created");
    db.close();
  });

  var job = {
              client: "John Snow",
              title: "Paint my fence",
              description: "Please paint my aweful fence!",
              payment: "200$",
              paymenttype: "On completion",
              skills: "fence painting, painting"
            };
  jober.collection("jobs").insertOne(job, function(err, res) {
    if (err) throw err;
    console.log("1 job created");
    db.close();
  });
});

MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  var jober = db.db("jober");

  jober.listCollections().toArray(function(err, collections){
      console.log(collections);
  });

  jober.collection("jobs").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });

  db.close();
});
