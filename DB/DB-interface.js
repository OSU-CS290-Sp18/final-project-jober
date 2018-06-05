var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://localhost:27017/";

var getByIDList = function(collection, IDlist=[], fieldsObj={}) {
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
        jober.collection(collection)
          .find(query)
          .project(fieldsObj)
          .toArray((err, result) => {
            if (err) throw err;
            db.close();
            resolve(result);
        });
      });
    });
  });
}

function insertNew(collection, record) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
      if (err) throw err;
      var jober = db.db("jober");
      record.timestamp = new Date().getTime();
      jober.collection(collection)
        .insertOne(record)
        .then((err, result) => {
          console.log("*** HERE ***");
          if (err) reject(err);
          db.close();
          resolve(result);
      });
    });
  });
}

function search(collection, queryObj={}, fieldsObj={}) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
      if (err) throw err;
      var jober = db.db("jober");
      jober.collection(collection)
        .find(queryObj)
        .project(fieldsObj)
        .toArray((err, result) => {
          if (err) throw err;
          // if (result) result.next();
          db.close();
          resolve(result);
      });
    });
  });
}

function update(collection, queryObj, updateObj){
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
      if (err) throw err;
      var jober = db.db("jober");
      jober.collection(collection)
        .updateOne(queryObj,updateObj)
        .then((result) => {
          db.close();
          resolve(result);
      });
    });
  });
}


module.exports = {
  getByIDList: getByIDList,
  insertNew: insertNew,
  search: search,
  update: update,
}
