var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";
var DB = require('./DB-interface');
// var dummy = require('./dummy/dummy-data');

var resultFields = {
  /* This obj lets you pick which fields ar returned.
   * You cant mix true and false, so either just
   * turn on a few with true, or turn off a few with false
   */
  // author_id:   false, //true,
  // author_name: false, //true,
  // title:          true,
	// price:       false, //true,
	// timestamp:   false, //true,
	description: false, //true,
  // skills:      false, //true,
  // comments:    false //fill with comment id's
}

var jobQuery = {
  // author_name: "jimmey cool"
};

var collections = ["employers"];

DB.search(collections,jobQuery,resultFields)
  .then((cards) => {
    console.log(cards);
});

// DB.getByIDList([],'comments').then((contractors) => {
//   console.log(contractors);
// });
//
// DB.getByIDList([],'employers').then((contractors) => {
//   console.log(contractors);
// });
//
// DB.getByIDList([],'jobs').then((contractors) => {
//   console.log(contractors);
// });
