var shell = require('shelljs');

var getStatus = function (next) {

    var status = {
        rubyVersion: "n/a",
        nodeVersion: "n/a",
        mongoVersion: "n/a",
        mongoStatus: "n/a"
    };

    status.rubyVersion = shell.exec('ruby --version', {silent:true}).output.replace(/(\r\n|\n|\r)/gm," ");;
    status.nodeVersion = shell.exec('node --version', {silent:true}).output.replace(/(\r\n|\n|\r)/gm," ");;
    status.mongoVersion = shell.exec('mongod --version', {silent:true}).output.replace(/(\r\n|\n|\r)/gm," ");;
    status.mongoStatus = shell.exec('service mongod status', {silent:true}).output.replace(/(\r\n|\n|\r)/gm," ");;

    next(status);
}

module.exports = {
    getStatus: getStatus
}