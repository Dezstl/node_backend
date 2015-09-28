require('../../models/User');
var userService = require('../../services/user');
var config = require('../../../../../config');
var should = require('should');
var expect = require('chai').expect;
var async = require('async');


var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
mockgoose(mongoose);

var User = mongoose.model('User');

before(function (done) {
    mongoose.connect('config.mongoDB.connectionString + config.mongoDB.dbName');

    //Create test users
    async.parallel([
            function(next){
                user1 = new User({
                    username: "user1",
                    firstName: "aaa",
                    lastName: "bbb",
                    jobTitle: "teacher",
                    city: "Chicago",
                    state: "IL",
                    active: true,
                    password: "password1"
                });
                user1.save(next);
            },
            function(next){
                user2 = new User({
                    username: "user2",
                    firstName: "bbb",
                    lastName: "bbb",
                    jobTitle: "teacher",
                    city: "Houston",
                    state: "TX",
                    active: true,
                    password: "password1"
                });
                user2.save(next);
            },
            function(next){
                user3 = new User({
                    username: "user3",
                    firstName: "aaa",
                    lastName: "ccc",
                    jobTitle: "engineer",
                    city: "Dallas",
                    state: "TX",
                    active: true,
                    password: "password1"
                });
                user3.save(next);
            },
            function(next){
                user4 = new User({
                    username: "user4",
                    firstName: "ddd",
                    lastName: "ccc",
                    jobTitle: "engineer",
                    city: "Los Angeles",
                    state: "CA",
                    active: false,
                    password: "password1"
                });
                user4.save(next);
            },
            function(next){
                user5 = new User({
                    username: "user5",
                    firstName: "aaa",
                    lastName: "ddd",
                    jobTitle: "officer",
                    city: "Dallas",
                    state: "TX",
                    active: false,
                    password: "password1"
                });
                user5.save(next);
            },
            function(next){
                user6 = new User({
                    username: "user6",
                    firstName: "aaa",
                    lastName: "ccc",
                    jobTitle: "officer",
                    city: "New York",
                    state: "NY",
                    active: false,
                    password: "password1"
                });
                user6.save(next);
            },
            function(next){
                user7 = new User({
                    username: "user7",
                    firstName: "ddd",
                    lastName: "ccc",
                    jobTitle: "teacher",
                    city: "New York",
                    state: "NY",
                    active: true,
                    password: "password1"
                });
                user7.save(next);
            }
        ], function(err){
        done();
    });
});

describe("User Service", function () {

    describe("Get Users", function () {
        it("should get all user in db", function (done) {
            userService.getUsers({}, function (err, users) {
                should.not.exist(err);
                should.exist(users);
                users.length.should.equal(7);
                done();
            });
        });
        it("should filter by active status", function (done) {
            userService.getUsers({status: "active"}, function (err, users) {
                should.not.exist(err);
                should.exist(users);
                users.length.should.equal(4);
                done();
            });
        });
        it("should filter by inactive status", function (done) {
            userService.getUsers({status: "inactive"}, function (err, users) {
                should.not.exist(err);
                should.exist(users);
                users.length.should.equal(3);
                done();
            });
        });
        it("should group all by city", function (done) {
            userService.getUsers({group: "city"}, function (err, users) {
                should.not.exist(err);
                should.exist(users);
                users['Chicago'].length.should.equal(1);
                users['Houston'].length.should.equal(1);
                users['Dallas'].length.should.equal(2);
                users['Los Angeles'].length.should.equal(1);
                users['New York'].length.should.equal(2);
                done();
            });
        });
        it("should group all by state", function (done) {
            userService.getUsers({group: "state"}, function (err, users) {
                should.not.exist(err);
                should.exist(users);
                users['IL'].length.should.equal(1);
                users['TX'].length.should.equal(3);
                users['CA'].length.should.equal(1);
                users['NY'].length.should.equal(2);
                done();
            });
        });
        it("should group by jobTitle", function (done) {
            userService.getUsers({group: "jobTitle"}, function (err, users) {
                should.not.exist(err);
                should.exist(users);
                users['teacher'].length.should.equal(3);
                users['engineer'].length.should.equal(2);
                users['officer'].length.should.equal(2);
                done();
            });
        });
        it("should group by firstName", function (done) {
            userService.getUsers({group: "firstName"}, function (err, users) {
                should.not.exist(err);
                should.exist(users);
                users['aaa'].length.should.equal(4);
                users['bbb'].length.should.equal(1);
                users['ddd'].length.should.equal(2);
                done();
            });
        });
        it("should group by lastName", function (done) {
            userService.getUsers({group: "lastName"}, function (err, users) {
                should.not.exist(err);
                should.exist(users);
                users['bbb'].length.should.equal(2);
                users['ccc'].length.should.equal(4);
                users['ddd'].length.should.equal(1);
                done();
            });
        });
        it("should sort by active and group by city", function (done) {
            userService.getUsers({status: "active", group: "city"}, function (err, users) {
                should.not.exist(err);
                should.exist(users);
                users['Chicago'].length.should.equal(1);
                users['Houston'].length.should.equal(1);
                users['Dallas'].length.should.equal(1);
                users['New York'].length.should.equal(1);
                users.should.not.have.property("Los Angeles");
                done();
            });
        });
        it("should sort by inactive and group by city", function (done) {
            userService.getUsers({status: "inactive", group: "city"}, function (err, users) {
                should.not.exist(err);
                should.exist(users);
                users['Los Angeles'].length.should.equal(1);
                users['Dallas'].length.should.equal(1);
                users['New York'].length.should.equal(1);
                users.should.not.have.property("Chicago");
                done();
            });
        });
        it("should send err when invalid status param", function (done) {
            userService.getUsers({status: "live"}, function (err, users) {
                should.exist(err);
                should.not.exist(users);
                done();
            });
        });
        it("should send err when invalid group param", function (done) {
            userService.getUsers({group: "password"}, function (err, users) {
                should.exist(err);
                should.not.exist(users);
                done();
            });
        });
    });

    describe("Create User", function () {
        it("should create user", function (done) {
            user = {
                username: "user8",
                firstName: "aaa",
                lastName: "ccc",
                jobTitle: "officer",
                city: "New York",
                state: "NY",
                active: true,
                password: "password1"
            }
            userService.createUser(user, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                User.findOne({username: user.username}, function (err, user) {
                    should.exist(user);
                    done();
                });
            });
        });
        it("should send err when trying to create a user with an in use username", function (done) {
            user = {
                username: "user8",
                firstName: "aaa",
                lastName: "ccc",
                jobTitle: "officer",
                city: "New York",
                state: "NY",
                active: true,
                password: "password1"
            }
            userService.createUser(user, function (err, result) {
                should.exist(err);
                should.not.exist(result);
                done();
            });
        });
        it("should send when err when missing required field", function (done) {
            user = {
                username: "user9",
                firstName: "aaa",
                lastName: "ccc",
                jobTitle: "officer",
                city: "New York",
                state: "NY",
                active: true
            }
            userService.createUser(user, function (err, result) {
                should.exist(err);
                should.not.exist(result);
                done();
            });
        });
        it("should send when err when required field is null", function (done) {
            user = {
                username: "user9",
                firstName: null,
                lastName: "ccc",
                jobTitle: "officer",
                city: "New York",
                state: "NY",
                active: true,
                password: "password1"
            }
            userService.createUser(user, function (err, result) {
                should.exist(err);
                should.not.exist(result);
                done();
            });
        });
    });

    describe("Update User", function () {
        it("should update user", function (done) {
            username = "user8";
            changeValues = {
                firstName: "new",
                lastName: "name"
            }
            userService.updateUser(username, changeValues, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                User.findOne({username: username}, function (err, updatedUser) {
                    should.exist(updatedUser);
                    updatedUser.firstName.should.equal(changeValues.firstName);
                    updatedUser.lastName.should.equal(changeValues.lastName);
                    done();
                });
            });
        });
        it("should return err when user does not exist", function (done) {
            username = "user10";
            changeValues = {
                firstName: "new",
                lastName: "name"
            }
            userService.updateUser(username, changeValues, function (err, result) {
                should.exist(err);
                should.not.exist(result);
                done();
            });
        });
    });

    describe("Delete User", function () {
        it("should delete user", function (done) {
            username = "user8";
            userService.deleteUser(username, function (err, result) {
                should.not.exist(err);
                should.exist(result);
                User.findOne({username: username}, function (err, deletedUser) {
                    should.not.exist(deletedUser);
                    done();
                });
            });
        });
    });

});


after(function () {
    mockgoose.reset();
    mongoose.connection.close();
});
