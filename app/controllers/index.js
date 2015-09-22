module.exports = function(app) {

	app.get('/', function (req, res) {
		res.redirect('/api');
	});

	app.get('/api', function (req, res) {
		res.json({message: "App is working!!!"});
	});

};