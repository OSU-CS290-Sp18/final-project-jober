# Database: MongoDB

## Installation

### Ubuntu (untested)

`sudo apt-get install mongodb-server`
`git clone https://github.com/OSU-CS290-Sp18/final-project-jober.git`

### Arch / Manjaro (untested)

```
sudo pacman -S mongodb mongodb-tools
git clone https://github.com/OSU-CS290-Sp18/final-project-jober.git
```

## Usage

### Starting the MongoDB server

### Connecting through Nodejs

```javascript
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("jober");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});

```
