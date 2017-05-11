
var express = require('express');
var app = express();
//set up middleware 
app.use(express.static('public'));
app.use(express.static('node_modules/jquery/dist/'));
app.use(express.static('node_modules/materialize-css/dist'));

app.get('/', function (req, res) {
  res.send("Display something");
});

app.listen(3000, function () {
   console.log('the app is running in http://localhost:3000/');
});