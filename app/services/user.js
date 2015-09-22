var User = require('../models/User');


var getUsers = function (next) {

	User.find(function (err, users) {
		if (err) {
			return next(err);
		}
		next(null, users)
	});

}

var createUser = function (user, next) {
	var errorMsg = ""

	//Validaton
	if (!user.hasOwnProperty("username") || user.username == null ) {
		errorMsg = "Username is required";
	} else if (!user.hasOwnProperty("firstName") || user.firstName == null ) {
		erroMsg = "First name is required";
	} else if (!user.hasOwnProperty("lastName") || user.lastName == null ) {
		errorMsg = "Last name is required";
	} else if (!user.hasOwnProperty("city") || user.city == null ) {
		errorMsg = "City is required";
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
			newUser.active = user.active;
			newUser.password = user.password;

			newUser.save(function(err) {
				if (err) {
					next(err);
				}
				next(null, "User Created");
			});
		}
	});

}


module.exports = {
	getUsers: getUsers,
    createUser: createUser
}

