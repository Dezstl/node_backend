userService = require('../services/user');

module.exports = function (app) {


	app.get('/api/user', function(req, res) {
		var params = req.query;

		userService.getUsers(params, function(err, users) {
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

	app.put('/api/user/:username', function(req, res) {
		var username = req.params.username;

		userService.updateUser(username, req.body, function(err, msg) {
			if (err) {
				return res.json({message: err});
			}
			res.json({message: msg});
		});
	});

	app.delete('/api/user/delete/:username', function(req, res) {
		var username = req.params.username;

		userService.deleteUser(username, function(err, msg) {
			if (err) {
				return res.json({message: err});
			}
			res.json({message: msg});
		});
	})

};