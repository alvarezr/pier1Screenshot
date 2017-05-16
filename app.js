//  main file
var express = require('express');
var screenshots = require('./screenshotsJSON');
var app = express();
//set up middleware 
app.use('/', express.static('public'));
app.use(express.static('node_modules/jquery/dist/'));
app.use(express.static('node_modules/materialize-css/dist'));


app.get('/screenshots', function(req, res, next){ 
    res.statusCode = 200;
    return res.json(JSON.stringify(screenshots.getJSON()));
});

app.listen(3000, function () {
   console.log('the app is running in http://localhost:3000/');
});