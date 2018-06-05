var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";
var DB = require('./DB-interface');

var resultFields = {
  /* This obj lets you pick which fields ar returned.
   * You cant mix true and false, so either just
   * turn on a few with true, or turn off a few with false
   */
   _id: true,
  // author_id, author_name, title, true, price
	// timestamp, description, skills, comments
}

var jobQuery = {
  /* This is
   *
   */
  name: "Jimmy Cool"
};

var collection = "jobs";

var updateObj = {
  $set: {
    name: "Joe Cool"
  }
};

var record = {
  author_id: "", //hex _id value
  name: "Test Dude",
  title: "activities",
  price: "100",
  description: "Do stuff!",
  skills: ["fencing", "thieving", "thugging"],
  comments: [] //fill with comment id's
};

DB.insertNew(collection, record)
  .then((result) => {
    console.log(result);
    console.log('Record created!');
  }).catch((err) => {
    console.log(err);
});

// DB.update(collection,jobQuery, updateObj )
//   .then((result) => {
//     console.log(result.result);
//     console.log('Record updated!');
// })

// DB.search(collection,jobQuery,resultFields)
//   .then((cards) => {
//     // console.log("cards",cards);
//     cards = cards.map((card) => {
//       return card._id;
//     });
//     // console.log(cards);
//     DB.getByIDList(collection,cards).then((cards) => {
//       console.log(cards);
//     });
// });

// DB.getByIDList('contractors').then((contractors) => {
//   console.log(contractors);
// });
