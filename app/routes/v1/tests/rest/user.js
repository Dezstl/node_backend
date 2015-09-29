var request = require('supertest');
var express = require('express');
var should = require('should');
var bodyParser = require('body-parser');
var app = exports.app = express();


before (function (done) {

    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(bodyParser.json());

    require('../../controllers/user')(app);

    done();

});


describe("User Controller", function () {
    describe("Get: /api/user", function () {
        it('should return 200 when', function (done) {
            request(app)
                .get('/api/user')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });
    describe("Get: /api/user?status=active", function () {
        it('should return 200', function (done) {
            request(app)
                .get('/api/user?status=active')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });
    describe("Get: /api/user?status=inactive", function () {
        it('should return 200', function (done) {
            request(app)
                .get('/api/user?status=inactive')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });
    describe("Get: /api/user?status=true", function () {
        it('should return 400, bad request', function (done) {
            request(app)
                .get('/api/user?status=true')
                .expect('Content-Type', /json/)
                .expect(400, done);
        });
    });
    describe("Get: /api/user?group=firstName", function () {
        it('should return 200', function (done) {
            request(app)
                .get('/api/user?status=inactive')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });
    describe("Get: /api/user?group=city", function () {
        it('should return 200', function (done) {
            request(app)
                .get('/api/user?group=city')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });
    describe("Get: /api/user?group=id", function () {
        it('should return 400, bad request', function (done) {
            request(app)
                .get('/api/user?group=id')
                .expect('Content-Type', /json/)
                .expect(400, done);
        });
    });
});