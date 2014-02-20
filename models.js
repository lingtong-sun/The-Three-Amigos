
var Mongoose = require('mongoose');

var UserSchema = new Mongoose.Schema({
	"_id" : false,
	"facebook_id": Number,
	"name" : String,
	"send_language" : String,
	"receive_language" : String,
	"image" : String
});

var FriendSchema = new Mongoose.Schema({
	"user_one" : { type: Number, ref: 'User' },
	"user_two" : { type: Number, ref: 'User' }
});

var MessageSchema = new Mongoose.Schema({
	"sender" : { type: Number, ref: 'User' },
	"recipient" : { type: Number, ref: 'User' },
	"send_time" : { type: Date, default: Date.now },
	"original" : String,
	"translated" : String
});


exports.User = Mongoose.model('User', UserSchema);
exports.Friend = Mongoose.model('Friend', FriendSchema);
exports.Message = Mongoose.model('Message', MessageSchema);


