var User = require('../models/User');

var _ = require('underscore');

var groupByType = ['city', 'state', 'role', 'firstName', 'lastName'];

var getUsers = function (params, next) {
	var toGroup = false;

	// Check for groupby
	if (params.hasOwnProperty("group")) {
		if (params.group != null && _.contains(groupByType, params.group)) {
			toGroup = true;
		} else {
			return next("Invalid status params");
		}
	}

	if (!params.hasOwnProperty("status")) {
		// Return full list of users
		var users = User.find(function (err, users) {
			if (err) {
				return next(err);
			} else if (toGroup) {
				return next(null, _.groupBy(users, params.group))
			}
			next(null, users);
		});
	} else {
		// Return list filterd by active statusS
	 	var users = queryUsersByStatus(params, function (err, users) {
			if (err) {
				return next(err);
			} else if (toGroup) {
				return next(null, _.groupBy(users, params.group))
			}
			next(null, users);
		});
	}

}

var createUser = function (user, next) {
	var errorMsg = ""

	//Validation
	if (!user.hasOwnProperty("username") || user.username == null ) {
		errorMsg = "Username is required";
	} else if (!user.hasOwnProperty("firstName") || user.firstName == null ) {
		erroMsg = "First name is required";
	} else if (!user.hasOwnProperty("lastName") || user.lastName == null ) {
		errorMsg = "Last name is required";
	} else if (!user.hasOwnProperty("city") || user.city == null ) {
		errorMsg = "City is required";
	} else if (!user.hasOwnProperty("state") || user.state == null) {
		errorMsg = "State is required";
	} else if (!user.hasOwnProperty("active") || user.active == null ) {
		errorMsg = "Active status is required";
	} else if (!user.hasOwnProperty("password") || user.password == null ) {
		errorMsg = "Password is required";
	}

	if (errorMsg != "") {
		return next(errorMsg, null);
	}

	User.findOne({"username": user.username}, function(err, existingUser) {
		if (existingUser) {
			next("Username exist!");
		} else {
			var newUser = new User();
			newUser.username = user.username;
			newUser.firstName = user.firstName;
			newUser.lastName = user.lastName;
			newUser.city = user.city;
			newUser.state = user.state;
			newUser.active = user.active;
			newUser.password = user.password;

			newUser.save(function(err) {
				if (err) {
					return next(err);
				}
				next(null, "User Created");
			});
		}
	});
}

var updateUser = function (username, userData, next) {
	User.findOne({"username": username}, function(err, user) {
		if (err) {
			return next(user);
		}

		if (userData.hasOwnProperty("firstName") && userData.firstName != null) {
			user.firstName = userData.firstName;
		}
		if (userData.hasOwnProperty("secondName") && userData.secondName != null) {
			user.secondName = userData.secondName;
		}
		if (userData.hasOwnProperty("city") && userData.city != null) {
			user.city = userData.city;
		}
		if (userData.hasOwnProperty("active") && userData.active != null) {
			user.active = userData.active;
		}
		if (userData.hasOwnProperty("password") && userData.password != null) {
			user.password = userData.password;
		}
		if (userData.hasOwnProperty("jobTitle") && userData.jobTitle != null) {
			user.jobTitle = userData.jobTitle;
		}
		if (userData.hasOwnProperty("state") && userData.state != null) {
			user.state = userData.state;
		}

		user.save(function(err) {
			if (err) {
				return next(err);
			}
			next(null, username + " has been updated.");
		});
	});
}

var deleteUser = function (username, next) {
	User.remove({"username": username}, function(err) {
		if (err) {
			return next(err);
		}
		next(null, username + " has been removed");
	});
}

var queryUsersByStatus = function(params, next) {

	if (params.status != null) {

		var active;
		if (params.status == 'active') {
			active = true;
		} else if (params.status == 'inactive') {
			active = false
		} else {
			return next("Entered invalid status value. Use 'active' or 'inactive'. ");
		}

		User.find({"active": active}, function(err, users) {
			if (err) {
				return next(err);
			}

			if (users != null && users.length > 0) {
				return next(null, users);
			} else {
				return next(null, {message: "No Users found with status " + params.status});
			}
		});
	} else {
		return next("Invalid status params");
	}

}



module.exports = {
	getUsers: getUsers,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}

