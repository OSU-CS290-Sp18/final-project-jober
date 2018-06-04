var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";
var getCollections = require('./collections/get-collections');

var getByIDList = function(IDlist,collectionName) {
  return new Promise((resolve, reject) => {
    return Promise.resolve().then(() => {
      // check IDlist length, if not 0, ensure query obj is XOR
      // if IDlist = [], grab everything in that collection
      var query = {};
      if (IDlist.length != 0) {
        IDlist = IDlist.map((element)=>{
          return ObjectId(element);
        });
        query = {
          _id: { "$in" : IDlist }
        };
      }
      return query;
    }).then((query) => {
      MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
        if (err) throw err;
        var jober = db.db("jober");
        jober.collection(collectionName)
          .find(query)
          .toArray((err, result) => {
            if (err) throw err;
            db.close();
            resolve(result);
        });
      });
    });
  });
}

var search = function(collectionList, queryObj={}, fieldsObj={}) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
      if (err) throw err;
      var jober = db.db("jober");
      var outList = [];
      collectionList.forEach((col) => {
        // outList.push()
        jober.collection(col)
          .find(queryObj).project(fieldsObj)
          .toArray((err, result) => {
            if (err) throw err;
            db.close();
            resolve(result);
        });
      });
    });
  });
}



module.exports = {
  getByIDList: getByIDList,
  search: search
}
