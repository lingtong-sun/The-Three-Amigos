
var models = require('../models');

exports.viewConversation = function(req, res){
	var friend_id = req.params.id;
	var my_id = req.session.user_id;

	var db_messages = new Array();

	var friend_profile;
	var my_profile;

	models.User 
		  .findOne({"facebook_id": friend_id})
		  .exec(setFriend);
    function setFriend(err, friend) {
    	if (err) console.log(err);
    	console.log(friend);
    	friend_profile = friend;
    }

	models.User 
		  .findOne({"facebook_id": my_id})
		  .exec(setFriend);
    function setFriend(err, me) {
    	if (err) console.log(err);
    	my_profile = me;
    	console.log(me);
    }

	models.Friend
		.findOne({"user_one": my_id,
				"user_two": friend_id})
		.exec(afterFindFriend);

	function afterFindFriend(err, friend) {
		if(err) console.log(err);
		console.log(friend);

		models.Message
			.find({"conversation": friend['conversation_id']})
			.sort("-send_time")
			.exec(afterFindMessages);

		function afterFindMessages(err, messages) {
			if(err) console.log(err);
			console.log(messages);
			db_messages = messages;
		}
	}

  	console.log(friend_id + ", " + my_id);
  	// res.render('conversation', {
  	// 	'data' : data
  	// });
};