//Setup Server
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var guid = require('node-uuid');
var passport = require('./app/modules/auth/passport')();


//Connect to DB
mongoose.connect('mongodb://localhost:27017/UserApi');


var app = express();
router = express.Router();

//Configure body parser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Setup passport
app.use(session({
  genid: function(req) {
    return guid.v4() // use UUIDs for session IDs
  },
  secret: 'proto x',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//Set port
var port = process.env.PORT || 8080;

// Middleware to ensure user is authenticated
app.use(require('./app/middleware/ensureAuthenticated').ensureAuthenticated);

//Configure Routes
app.use('/api', router);

require('./app/controllers/index')(app);
require('./app/controllers/user')(app);
require('./app/controllers/auth')(app);
require('./app/controllers/environment')(app);


//Start Server
app.listen(port);

console.log("Server Listening on port: " + port);