var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/User');

module.exports = function() {

     passport.use(new LocalStrategy(
      function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          user.validPassword(password, function (err, result) {
            if (err) {
                return done(err);
            }
            if (result) {
                return done(null, user);
            } else  {
                return done(null, false, { message: 'Incorrect password.' })
            }
          });

        });
      }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    return passport;
}