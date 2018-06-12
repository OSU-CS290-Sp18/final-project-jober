
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var contractData = require('./contractData');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));


app.get('/style.css', function (req, res, next) {
    res.status(200).sendFile(__dirname + '/Styles/style.css');
});

app.get('/index.js', function (req, res, next) {
    res.status(200).sendFile(__dirname + '/Styles/index.js');
});
app.get('/signin', function (req, res, next) {
    res.status(200).render('signin');
});

app.get('/main', function (req, res, next) {
    res.status(200).render('homePage', {
        contracts: contractData
    });
});

app.listen(port, function () {
    console.log("== Server listening on port", port);
})
