
var models = require('../models');

exports.viewConversation = function(req, res){
	var friend_id = req.params.id;
	var my_id = req.session.user_id;

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
			.sort("-send_time")
			.exec(afterFindMessages);

		function afterFindMessages(err, messages) {
			if(err) console.log(err);
			var counter = 0;
			if (messages.length == 0) {
				res.render('conversation', {});
			}
			for (var i=0; i < messages.length; i++) {
				if(messages[i]['conversation'] < 0)
					return;

				var message_by;
				if (messages[i]['sender'] == friend_id){
					models.User 
		  			.findOne({"facebook_id": my_id})
		  			.exec(setSender);
				} else {
					models.User 
				  	.findOne({"facebook_id": friend_id})
				  	.exec(setSender);
				}
				
    			
				function setSender(err, sender) {
    				if (err) console.log(err);
    				message_by = sender;
					db_messages.push({"message": messages[counter],
								  "user": message_by});
					counter ++;
					if (counter == messages.length) {
						console.log(db_messages);
						res.render('conversation', {"messages": db_messages});	
					}
    			}

				
				
			}
		}
	}

  	console.log(friend_id + ", " + my_id);
  	// res.render('conversation', {
  	// 	'data' : data
  	// });
};