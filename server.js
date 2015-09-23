//Setup Server
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to DB
mongoose.connect('mongodb://localhost:27017/UserApi');


var app = express();
router = express.Router();

//Configure body parser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Set port
var port = process.env.PORT || 8080;

//Configure Routes
app.use('/api', router);

require('./app/controllers/index')(app);
require('./app/controllers/user')(app);


//Start Server
app.listen(port);

console.log("Server Listening on port: " + port);