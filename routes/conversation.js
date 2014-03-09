var models = require('../models');
var moment = require('moment');

exports.viewConversation = function(req, res){

	var timeElapsed = (new Date().getTime() - req.session.startTime);
	console.log("chat.js --> time elapsed: " + timeElapsed);


	var friend_id = req.params.id;
	var my_id = req.session.user_id;

	console.log("conversation: "+ friend_id);
	//set recipient for message on this page
	req.session.recipient = friend_id;

	var db_messages = new Array();

	models.Friend
	.findOne({"user_one": my_id,
			"user_two": friend_id})
	.populate("user_two")
	.exec(afterFindFriend);


	function afterFindFriend(err, friend) {
		if(err) console.log(err);
		if (friend == null) return;
		models.Message
			.find({"conversation": friend['conversation_id']})
			.populate("sender")
			.sort("send_time")
			.exec(afterFindMessages);

		function afterFindMessages(err, messages) {
			console.log("timeElapsed in afterFindMessages: " + timeElapsed);
			if(err) console.log(err);
			if (messages.length == 0) {
				if(req.session.versionA) {
					res.render('conversation', {"messages": db_messages ,"versionA" : true, "timeElapsed" : timeElapsed});
				} else {
					res.render('conversation', {"messages": db_messages ,"versionA" : false, "timeElapsed" : timeElapsed});
				}
			}
			for (var i=0; i < messages.length; i++) {
				if(messages[i]['conversation'] < 0)
					return;

				var type = "sender";
				console.log(messages[i]['sender']['_id'] +", " + friend_id);
				if (messages[i]['sender']['_id'] == friend_id) {
					type = "receiver";
				}
			//	console.log(messages[i]);
				messages[i] = messages[i].toObject();
				var formattedtime = moment(messages[i].send_time).format("lll");

				messages[i].send_time = formattedtime;
				db_messages.push({"message": messages[i],
									"type": type});
				
			}
			console.log(db_messages);
			console.log(friend["user_two"]);
			if (req.session.versionA) {
				res.render('conversation', {"messages": db_messages, "friend": friend["user_two"], "versionA" : true, "timeElapsed" : timeElapsed});
			} else {
				res.render('conversation', {"messages": db_messages, "friend": friend["user_two"], "versionA" : false, "timeElapsed" : timeElapsed});
			}
		}
	}

  	console.log(friend_id + ", " + my_id);
  	// res.render('conversation', {
  	// 	'data' : data
  	// });
};