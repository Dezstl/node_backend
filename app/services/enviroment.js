var shell = require('shelljs');

var getStatus = function (next) {

    var status = {}

    status.rubyVersion = shell.exec('ruby --version', {silent:true}).output.replace(/(\r\n|\n|\r)/gm," ");;
    status.nodeVersion = shell.exec('node --version', {silent:true}).output.replace(/(\r\n|\n|\r)/gm," ");;
    status.mongoVersion = shell.exec('mongod --version', {silent:true}).output.replace(/(\r\n|\n|\r)/gm," ");;
    status.mongoStatus = shell.exec('service mongod status', {silent:true}).output.replace(/(\r\n|\n|\r)/gm," ");;

    next(status);
}

var lsPath = function(path, next) {
    var files = [];

    if (path) {
        files = shell.ls(path);
    } else {
        files = shell.ls();
    }

    if (files.length == 0) {
       return next({messge: "Invalid Path"});
    }
    next(null, files);
};

module.exports = {
    getStatus: getStatus,
    lsPath: lsPath
}