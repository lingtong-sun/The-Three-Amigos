
var Mongoose = require('mongoose');

var UserSchema = new Mongoose.Schema({
	"_id" : false,
	"facebook_id": Number,
	"name" : String,
	"date_joined" : { type: Date, default: Date.now },
	"send_language" : String,
	"receive_language" : String,
	"new_user": Boolean,
	"image_source" : String
});

var FriendSchema = new Mongoose.Schema({
	"user_one" : { type: Number, ref: 'User' },
	"user_two" : { type: Number, ref: 'User' },
	"friends_since" : { type: Date, default: Date.now }
});

var MessageSchema = new Mongoose.Schema({
	"sender" : { type: Number, ref: 'User' },
	"recipient" : { type: Number, ref: 'User' },
	"send_time" : { type: Date, default: Date.now },
	"original" : String,
	"translated" : String
});


exports.Project = Mongoose.model('User', UserSchema);
exports.Project = Mongoose.model('Friend', FriendSchema);
exports.Project = Mongoose.model('Message', MessageSchema);


