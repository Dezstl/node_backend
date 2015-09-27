var enviromentService = require('../services/enviroment');

module.exports = function (app) {

    app.get('/api/status', function (req, res) {

        enviromentService.getStatus(function (result) {
            res.send(result);
        });
    });

    app.get('/api/dir', function (req, res) {
        var path = req.query.path;

        enviromentService.lsPath(path, function(result) {
            res.send(result);
        });
    });
}