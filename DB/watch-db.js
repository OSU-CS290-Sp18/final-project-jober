var Mongomon = require('./index');
var mongomon = new Mongomon({interval: 5000, url: 'localhost:27017/mydatabase'});

mongomon.on('serverStatus', function(data){
  console.log('server stats:',JSON.stringify(data));
  console.log();
});

mongomon.on('dbstat', function(data){
  console.log('db stats:',JSON.stringify(data));
  console.log();
});

mongomon.on('collstat', function(data){
  console.log('collection stats:',JSON.stringify(data));
  console.log();
});

//start calling db.serverStatus() on the provided interval
mongomon.start();

//get database statistics once
mongomon.getDBStats();
//get collection statistics once (for each collection in the database)
mongomon.getCollStats();
