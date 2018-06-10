
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var DB = require('./../DB/DB-interface');

var contractData = require('./contractData');

var app = express();
var port = process.env.PORT || 3000;



app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/style.css', function (req, res, next) {
    res.status(200).sendFile(__dirname + '/Styles/style.css');
});

app.get('/index.js', function (req, res, next) {
    res.status(200).sendFile(__dirname + '/Styles/index.js');
});

app.get('/main', function (req, res, next) {
    // console.log(contractData);
    // contractData.forEach((contract) => {
    //   return DB.insertNew("jobs",contract)
    //   .then((result) => {
    //     console.log(result);
    //   });
    // });
    var jobList = DB.search("jobs");
    var contractorList = DB.search("contractors");
    Promise.all([ jobList, contractorList ])
    .then((lists) => {
      console.log(lists);
      res.status(200).render('homePage', {
          contracts: lists[0],
          // contractors: lists[1]
      });
    });
});

app.post('/submitJob', function(req, res) {
  DB.search("jobs", req.body).then((result) => {
    if (result.length == 0) {
      console.log("Inserting...");
      DB.insertNew('jobs', req.body)
        .then((result) => {
        console.log("Inserted: ",result.ops);
        return result.ops;
      }).then((result) => {
        var context = result[0];
        context.layout = false;
        res.status(200).render('partials/contractCard', context);
      }).catch((err) => {console.log("Error: ",err)});
    } else {
      console.log("Error: Duplicate insertion");
    }
  }).catch((err) => {
    console.log("Error: ",err);
  });

});

app.listen(port, function () {
    console.log("== Server listening on port", port);
})
