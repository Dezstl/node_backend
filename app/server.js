//Setup Server
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

//Connect to DB
mongoose.connect('mongodb://localhost:27017/UserApi');
//Configure body parser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Modules
var User = require('./models/User');

//Set port
var port = process.env.PORT || 8080;


//API ENDPOINTS
var router = express.Router();

router.get('/', function (req, res) {

	res.json({message: "App is working!!!"});
});

router.post('/user', function (req, res) {

	var user = new User();
	user.username = req.body.username;
	user.firstName = req.body.firstName;
	user.lastName = req.body.lastName;
	user.city = req.body.city;
	user.state = req.body.state;
	user.active = req.body.active

	user.save(function(err) {
		if (err) {
			res.send(err);
		}
		res.json({ message: "User Created"});
	})

});

router.get('/user', function(req, res) {
	User.find(function (err, users) {
		if (err) {
			res.send(err);
		}

		res.json(users);
	});
});


//Resgister routes
app.use('/api', router);


//Start Server
app.listen(port);

console.log("Server Listening on port: " + port);