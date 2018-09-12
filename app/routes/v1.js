//Version 1
var express = require('express');
var session = require('express-session');
var app = module.exports = express();
var guid = require('node-uuid');
var passport = require('./v1/modules/auth/passport')();
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('../../swagger.json');

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

// Middleware to ensure user is authenticated
app.use(require('./v1/middleware/ensureAuthenticated').ensureAuthenticated);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require('./v1/controllers/index')(app);
require('./v1/controllers/user')(app);
require('./v1/controllers/auth')(app);
require('./v1/controllers/environment')(app);
