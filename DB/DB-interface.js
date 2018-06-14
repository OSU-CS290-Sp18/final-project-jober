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
          .sort({'_id': -1})
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
      if (err) reject(err);
      var jober = db.db("jober");
      var date = new Date();
      record.timestamp =
        date.getHours()+':'+date.getMinutes()+', '+date.toDateString();
      console.log(record.timestamp);
      jober.collection(collection)
        .insertOne(record)
        .then((result, err) => {
          // console.log("Error: insertNew: ",err);
          // console.log("Result: insertNew: ",result);
          db.close();
          if (err) reject(err);
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
      if (queryObj.hasOwnProperty("_id")) {
        queryObj._id = ObjectId(queryObj._id);
      }
      jober.collection(collection)
        .find(queryObj)
        .sort({'_id': -1})
        .project(fieldsObj)
        .toArray((err, result) => {
          db.close();
          if (err) reject(err);
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
        .then((result,err) => {
          db.close();
          if (err) reject(err)
          resolve(result);
      });
    });
  });
}

function removeByID(collection, deleteMe}) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
      if (err) throw err;
      var jober = db.db("jober");
      jober.collection(collection)
        .remove(deleteMe)
        .then((result,err) => {
          db.close();
          if (err) reject(err)
          resolve(result);
        });
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
