var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
		firstName: { type: String, required: true },
    	lastName: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        jobTitle: { type: String, required: false },
        city: { type: String, required: true},
        state: {type: String, required: true},
        active: {type: Boolean, required: true}

});

module.exports = mongoose.model('User', UserSchema);