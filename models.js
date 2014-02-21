console.log("imported models");
var Mongoose = require('mongoose');

var UserSchema = new Mongoose.Schema({
	"_id": Number,
	"name" : String,
	"send_language" : String,
	"receive_language" : String,
	"image" : String
});

exports.User = Mongoose.model('User', UserSchema);

var FriendSchema = new Mongoose.Schema({
	"user_one" : { type: Number, ref: 'User' },
	"user_two" : { type: Number, ref: 'User' },
	"conversation_id" : { type:Number, default: -1}
});

exports.Friend = Mongoose.model('Friend', FriendSchema);

var MessageSchema = new Mongoose.Schema({
	"sender" : { type: Number, ref: 'User' },
	"recipient" : { type: Number, ref: 'User' },
	"send_time" : { type: Date, default: Date.now },
	"original" : String,
	"translated" : String,
	"conversation": { type: Number, ref: 'Friend'}
});

exports.Message = Mongoose.model('Message', MessageSchema);


