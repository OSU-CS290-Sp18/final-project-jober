
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
    console.log(contractData);
    var jobList = DB.search("jobs");
    var contractorList = DB.search("contractors");
    Promise.all([jobList,contractorList]).then((lists) => {
      console.log(lists);
    });
    res.status(200).render('homePage', {
        contracts: contractData
    });
});

app.post('/submitJob', function(req, res, next) {
  console.log(req.body);
  DB.insertNew('jobs', req.body).then((result) => {
      console.log(result);
      console.log('Record created!');
    }).catch((err) => {
      console.log(err);
  });

});

app.listen(port, function () {
    console.log("== Server listening on port", port);
})
