var enviromentService = require('../../services/enviroment');
var should = require('should');
var expect = require('chai').expect;
var shell = require('shelljs');

describe("Enviroment Server", function () {

    describe("Get Status", function () {
        it("should return values", function () {
            enviromentService.getStatus(function (result) {
                should.exist(result);
                result.should.have.property("rubyVersion");
                result.should.have.property("nodeVersion");
                result.should.have.property("mongoVersion");
                result.should.have.property("mongoStatus");
                result.rubyVersion.length.should.be.above(0);
                result.nodeVersion.length.should.be.above(0);
                result.mongoVersion.length.should.be.above(0);
                result.mongoStatus.length.should.be.above(0);
            });
        });
    });

    describe("LS Path", function() {
        it("should return correct files", function () {
            var path = "app/routes"
            var files = shell.ls(path);
            enviromentService.lsPath(path, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                result.should.deepEqual(files);
            });
        });
        it("should return current dir when no path given", function () {
            var files = shell.ls();
            enviromentService.lsPath(null, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                result.should.deepEqual(files);
            });
        });
        it("should err when invalid path", function () {
            var path = "some/invalid/path";
            enviromentService.lsPath(path, function(err, result) {
                should.exist(err);
            });
        });
    });

});

