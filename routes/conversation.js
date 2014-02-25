
var models = require('../models');

exports.viewConversation = function(req, res){
	var friend_id = req.params.id;
	var my_id = req.session.user_id;
	console.log("conversation: "+ friend_id);
	//set recipient for message on this page
	req.session.recipient = friend_id;

	var db_messages = new Array();

	var friend_profile;
	var my_profile;

	models.Friend
	.findOne({"user_one": my_id,
			"user_two": friend_id})
	.exec(afterFindFriend);


	function afterFindFriend(err, friend) {
		if(err) console.log(err);

		models.Message
			.find({"conversation": friend['conversation_id']})
			.populate("sender")
			.sort("send_time")
			.exec(afterFindMessages);

		function afterFindMessages(err, messages) {
			if(err) console.log(err);
			if (messages.length == 0) {
				res.render('conversation', {"messages": db_messages});
			}
			for (var i=0; i < messages.length; i++) {
				if(messages[i]['conversation'] < 0)
					return;

				var type = "sender";
				console.log(messages[i]['sender']['_id'] +", " + friend_id);
				if (messages[i]['sender']['_id'] == friend_id) {
					type = "receiver";
				}
				db_messages.push({"message": messages[i],
									"type": type});
				
			}
			console.log(db_messages);
			res.render('conversation', {"messages": db_messages});
		}
	}

  	console.log(friend_id + ", " + my_id);
  	// res.render('conversation', {
  	// 	'data' : data
  	// });
};