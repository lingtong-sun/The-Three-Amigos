var data = require('../users.json');

var models = require('../models');

exports.view = function(req, res){
  console.log(req.session.user_id);

  var current_user = req.session.user_id;
  var db_data = new Array();
  var db_messages = new Array();

  var my_profile;
  models.User 
		  .findOne({"facebook_id": current_user})
		  .exec(setFriend);
  function setFriend(err, me) {
   	if (err) console.log(err);
   	my_profile = me;
   	console.log(me);
   	//assume this will never finish last
  }



  models.Friend
  		.find({"user_one": current_user})
  		.exec(afterFindFriends);

  function afterFindFriends(err, friends) {
    if(err) console.log(err);
    //console.log(friends);
    var counter = 0;
    var message_counter = 0;
    var counter_dup = 0;
    for (var i=0; i < friends.length; i++) {
    	if (friends[i]['conversation_id'] >= 0) message_counter++;
    }
    console.log(message_counter);
    for (var i=0; i < friends.length; i++) {
    	var json = friends[i];
    	//console.log(json);
    	var friend_id = json['user_two'];
    	
    	models.User
    		  .find({"facebook_id": friend_id})
    		  .exec(afterGrabbingUserData);

    	function afterGrabbingUserData(err, users) {
    		if(err) console.log(err);
    		//console.log(users);
    		db_data[counter] = users[0];
    		var friend_json = friends[counter];
    		counter ++;
  			//console.log(counter + ": " + friend_json['conversation_id']);
  			if (friend_json['conversation_id'] >= 0) {
  				models.Message
    				.find({"conversation": friend_json['conversation_id']})
    			  	.sort("-send_time")
    			  	.exec(afterGrabbingMessageData);

    			function afterGrabbingMessageData(err, messages) {
    				if (err) console.log(err);
    				//console.log(messages);
    				if (messages.length > 0 ) {
    					db_messages.push({"message": messages[0],
    									  "user": db_data[counter_dup]});
    				}
    				console.log(message_counter + ": " + counter);
    				counter_dup ++;
    				message_counter--;
    				if (message_counter == 0 && counter == friends.length && my_profile!=undefined) {
    					console.log(db_data);
    					console.log(db_messages);
   						res.render('chat', { "users" : db_data, 
   									 "messages" : db_messages ,
   									 "curr_user": my_profile});
    				}	
    			}
    		} else {
    			counter_dup ++; //if no messages
    		}

    		if (counter == friends.length && message_counter == 0 && my_profile!=undefined) {
    			console.log(db_data);
    			console.log(db_messages);
   				res.render('chat', { "users" : db_data, 
   									 "messages" : db_messages ,
   									 "curr_user": my_profile});
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

