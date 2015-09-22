userService = require('../services/user');

module.exports = function (app) {


	app.get('/api/user', function(req, res) {
		userService.getUsers(function(err, users) {
			if (err) {
				return res.json({message: err});
			}

			res.send(users);
		});
	});

	app.post('/api/user', function (req, res) {

		userService.createUser(req.body, function(err, msg) {
			if (err) {
				return res.json({message: err});
			}
			res.json({message: msg});
		});
	});

};