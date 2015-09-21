//Setup Server
var express = require('express');
var bodyParser = require('body-parser');
var app = express();


//Configure body parser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Set port
var port = process.env.PORT || 8080;


//API ENDPOINTS
var router = express.Router();

router.get('/', function (req, res) {

	res.json({message: "App is working!!!"});
});


//Resgister routes
app.use('/api', router);


//Start Server
app.listen(port);

console.log("Server Listening on port: " + port);