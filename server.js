//Setup Server
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');


//Connect to DB
var connectionString = process.env.DATABASE_CONNECTION_STRING || config.mongoDB.connectionString;
mongoose.connect((connectionString + config.mongoDB.dbName), {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


var app = express();
const router = express.Router();

//Configure body parser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


//Set port
var port = process.env.PORT || config.port;

var VERSIONS = config.versions;

//Configure Routes
app.use('/', router);

//Version paths
for (var k in VERSIONS) {
    app.use(VERSIONS[k], require('./app/routes' + VERSIONS[k]));
}

//Return the version paths
app.get('/', function(req, res) {
    res.json(VERSIONS);
})

//Start Server
app.listen(port);

console.log("Server Listening on port: " + port);