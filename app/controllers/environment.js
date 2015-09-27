var enviromentService = require('../services/enviroment');

module.exports = function (app) {

    app.get('/api/status', function (req, res) {

        enviromentService.getStatus(function (result) {
            res.send(result);
        });
    });
}