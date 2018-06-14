
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var DB = require('./../DB/DB-interface');
var contractData = require('./contractData');

var app = express();
var port = process.env.PORT || 3000;
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/style.css', function (req, res, next) {
    res.status(200).sendFile(__dirname + '/Styles/style.css');
});
app.get('/index.js', function (req, res, next) {
    res.status(200).sendFile(__dirname + '/Styles/index.js');
});

app.get('/', function (req, res, next) {
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

app.get('/users', function (req, res, next) {
    var userList = DB.search("users");
    Promise.all(userList).then((list) => {
        console.log(list);
        list.forEach(usr => {
            list.largeFormat = false;
        });
        res.status(200).render('usersPage', {
            users: list[0]
        })
    });
});

app.get('/user/:userID', function (req, res, next) {
    var userID = req.params.userID.toLowerCase();
    DB.search('users').then((result) => {
        if(result.length > 0) {
            var user = result.ops.find({user_ID: userID});
            console.log("Found user: ", user);
            var userActiveContracts = getUserContracts(user, 'active' );
            var userPastContracts = getUserContracts(user, 'past');
            context.layout = false;
            res.status(200).render('userPage', {
                userCard: user,
                activeContracts: userActiveContracts,
                pastContracts: userPastContracts
            })

        } else {
            console.log('Error: User Not Found!');
            res.status(404).render('404Page');
        }
    });
});

app.post('/sumbitUser', function(req, res) {

    var username = req.params.username.toLowerCase();
    var password = req.params.password.toLowerCase();

    DB.search("users", req.body ).then((result) => {
        if (result.length == 0) {
            console.log("Inserting new user..");
            DB.insertNew('users', req.body)
            .then((result) => {
                console.log("Inserted: ", result.ops);
                return result.ops;
            }).then((result) => {
                var context = result[0];
                context.layout = false;
                res.status(200).render('partials/userCard', context);
            })

        } else {
            console.log("Error: User Already Exists!");
        }
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

app.post('/removeJob/:jodID', function(req, res) {
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
});

app.post('/submitComment', function(req, res) {
    console.log("Inserting...");
    DB.insertNew('comments', req.body)
        .then((result) => {
          console.log("Inserted: ",result.ops);
          return result.ops;
      }).then((result) => {
          var context = result[0];
          context.layout = false;
          res.status(200).render('partials/commentCard', context);
      }).catch((err) => {
          console.log("Error: ",err)
    });
  });

app.get('*', function (req, res) {
  res.render('404');
});

app.listen(port, function () {
    console.log("== Server listening on port", port);
})


function addContractToUser(contract) {
    var usersList = DB.search('users');
    var user = usersList.find({user_ID: contract.author_ID});

    DB.update('users', )

}
//Get all the contracts assosied with the user (type of 'active' or 'past')
function getUserContracts(user, type) {
    var contractIDList = null;
    var contractList = [];
    var jobsList = DB.search('jobs');

    switch(type) {
        case 'active':
            contractIDList = user.pastContracts;
            break;

        case 'past':
            contractIDList = user.activeContracts;
            break;

        defalt:
            return;
    }

    contractIDList.forEach( contID => {
        contractList.add( jobsList.find({job_ID: contID}) );
    });

    return contractList;
}
