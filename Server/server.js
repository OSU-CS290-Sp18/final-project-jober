
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var contractData = require('./contractData');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('Styles'));

app.get('/', function (req,res) {
  res.status(200).render('homePage', {
    contracts: contractData
  });
});

app.get('/:r', function (req, res) {
    r = req.params.r;
    if(r === 'home' || r === 'contracts' || r === 'main'){
      res.status(200).render('homePage', {
          contracts: contractData
      });
    }
    else{
      res.status(404).render('404');
    }
});

app.listen(port, function () {
    console.log("== Server listening on port", port);
})
