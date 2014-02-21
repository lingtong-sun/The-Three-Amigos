var data = require('../users.json');

var models = require('../models');

exports.view = function(req, res){
  console.log(req.session.user_id);

  var current_user = req.session.user_id;
  var db_data = new Array();
  var db_messages = new Array();
  models.Friend
  		.find({"user_one": current_user})
  		.exec(afterFindFriends);

  function afterFindFriends(err, friends) {
    if(err) console.log(err);
    //console.log(friends);
    var counter = 0;
    var message_counter = 0;
    for (var i=0; i < friends.length; i++) {
    	if (friends[i]['conversation_id'] >= 0) message_counter++;
    }
    console.log(message_counter);
    for (var i=0; i < friends.length; i++) {
    	var json = friends[i];
    	var friend_id = json['user_two'];
    	
    	models.User
    		  .find({"facebook_id": friend_id})
    		  .exec(afterGrabbingUserData);

    	function afterGrabbingUserData(err, users) {
    		if(err) console.log(err);
    		//console.log(users);
    		var stuff = {};
    		stuff[users[0]['facebook_id']] = users[0];
    		db_data[counter] = stuff;
    		counter ++;
    		console.log(counter + " " + friends.length);
    		if (counter == friends.length && message_counter == 0) {
    			console.log(db_data);
    			console.log(db_messages);
   				res.render('chat', { "users" : db_data, 
   									 "messages" : db_messages });
    		}
    	}

    	if (json['conversation_id'] >= 0) {
    		models.Message
    			  .find({"conversation": json['conversation_id']})
    			  .sort("-send_time")
    			  .exec(afterGrabbingMessageData);

    		function afterGrabbingMessageData(err, messages) {
    			if (err) console.log(err);
    			console.log(messages);
    			if (messages.length > 0 ) {
    				db_messages.push(messages[0]);
    			}
    			message_counter--;
    			if (counter == friends.length && message_counter == 0) {
    				console.log(db_data);
    				console.log(db_messages);
   					res.render('chat', { "users" : db_data, 
   									 "messages" : db_messages });
    			}	
    		}
    	}
    }
   	
  }
};


  // var db_messages = new Array();
  // models.Friend
  // 	.find({"user_one": current_user,
  // 		   "conversation_id": {$gte: 0}})
  // 	.exec(afterFindFriends_v2);

  // function afterFindFriends_v2(err, friends) {
  // 	if(err) console.log(err);
  // 	console.log(friends);
  // }

 // res.render('chat', { "users" : data });

