
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var DB = require('./../DB/DB-interface');
var mailer = require('./mailer');

var app = express();
var port = process.env.PORT || 3000;
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.json());


function insertComments(jobCardList) {
  jobCardList.forEach((el) => {
    var IDList = el.comments;
    DB.search('comments', IDList).then((result) => {
      el.comments = result;
    });
  }).then((stuff) => {
    console.log(stuff);
    return jobCardList;
  });
}

app.get('/', function (req, res, next) {
    var jobList = DB.search("jobs").then((jobs) => {
      var promises = [];
      jobs.forEach((el) => {
        var IDList = el.comments;
        if (!el.hasOwnProperty('comments')) IDList = [000000000000000000000000];
        promises.push(DB.getByIDList('comments', IDList));
      });
      Promise.all(promises).then((output) => {
        for (var i = 0; i < jobs.length; i++) {
          jobs[i].comments = output[i];
        }
        return jobs;
      }).then((jobs) => {
        res.status(200).render('homePage', {
            contracts: jobs,
        });
      });
    });
});

app.post('/submitJob', function(req, res) {
  DB.search("jobs", req.body).then((result) => {
    if (result.length == 0) {
      console.log("Inserting job...");
      DB.insertNew('jobs', req.body)
        .then((result) => {
        console.log("Job inserted!");
        return result.ops;
      }).then((result) => {
        var context = result[0];
        context.layout = false;
        console.log("Sending render...");
        res.status(200).render('partials/contractCard', context);
        console.log("Render sent!");
      }).catch((err) => { if (err) console.log("Error: ",err)});
    } else {
      console.log("Error: Duplicate insertion");
    }
  }).catch((err) => {
    if (err) console.log("Error: ",err);
  });
});

app.get('/contract/:jobID', function(req, res, next) {
  var jobID = req.params.jobID;
  if(jobID == "index.js") {
    res.status(200).sendFile(__dirname + '/public/index.js');
  } else if(jobID == "style.css") {
    res.status(200).sendFile(__dirname + '/public/style.css');
  } else {
    console.log('jobID: ', jobID);
    DB.search("jobs", {_id: jobID} )
    .then((job) => {
      if (!job[0].hasOwnProperty('comments'))
        job[0].comments = [000000000000000000000000];
      DB.getByIDList('comments', job[0].comments)
      .then((comments) => {
        job[0].comments = comments;
        console.log(job);
        res.status(200).render('singlecontract', {
           contracts: job
        });
      });
    });
  };
});

app.post('/removeJob/:jobID', function(req, res) {
  console.log("Removing job...");
  var jobID = req.params.jobID;
  DB.removeByID('jobs', jobID)
    .then((result) => {
    console.log("Job removed!");
    res.status(200).send();
  }).catch((err) => { if (err) console.log("Error: ",err)});
});

app.post('/acceptJob', function(req, res) {
  var info = req.body;
  mailer.sendAccept(info.nameFrom,
    info.emailFrom,
    info.message,
    info.emailTo);
});

app.post('/submitComment', function(req, res) {
    console.log('Received Comment: ', req.body);
    console.log("Inserting...");
    DB.insertNew('comments', req.body)
        .then((result) => {
          console.log("Inserted: ",result.ops);
          var context = result.ops[0];
          context.layout = false;
          res.status(200).render('partials/commentCard', context);
          var queryObj = { _id: result.ops[0].contract_id };
          var updateObj = {
            $push: { comments: result.ops[0]._id }
          };
          DB.update('jobs', queryObj, updateObj).then((state) => {
            console.log(state.result);
          });
      }).catch((err) => {
          console.log("Error: ",err)
    });
  });

app.get('*', function (req, res) {
  res.status(404).render('404');
});

app.listen(port, function () {
    console.log("== Server listening on port", port);
})
