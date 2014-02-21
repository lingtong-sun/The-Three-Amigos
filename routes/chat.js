
var models = require('../models');

exports.view = function(req, res){
  console.log(req.session.user_id);

  var current_user = req.session.user_id;
  
  var db_users;
  var db_messages = new Array();
  var my_profile;

  models.User 
		  .findOne({"_id": current_user})
		  .exec(setFriend);
  function setFriend(err, me) {
   	if (err) console.log(err);
   	my_profile = me;
   	console.log(me);
   	if(my_profile!=undefined && db_users!=undefined && message_counter==0) {
   		console.log(db_messages);
 		res.render('chat', {"users": db_users, "curr_user": my_profile,
 				 "messages": db_messages})
 	}  	
  }

  models.Friend
  		.find({"user_one": current_user})
  		.populate("user_two")
  		.exec(afterFindFriends);

  function afterFindFriends(err, friends) {
    if(err) console.log(err);
    console.log(friends);
    db_users = friends;
    var message_counter = 0;
    for (var i=0; i < friends.length; i++) {
    	if (friends[i]['conversation_id'] >= 0) message_counter++;
    }

    for (var i=0; i<friends.length; i++) {
    	models.Message 
    		  .find({"conversation": friends[i]["conversation_id"]})
    		  .populate("sender")
    		  .populate("recipient")
    		  .sort("-send_date")
    		  .exec(afterFindMessages);

    	function afterFindMessages(err, messages) {
    		if(err) console.log(err);
    		if (messages.length == 0) return;
    		var friend = messages[0]['sender'];
    		if (messages[0]['sender']['_id'] == current_user) friend = messages[0]['recipient'];
    		db_messages.push({"friend": friend, "message": messages[0]});
    		message_counter--;
    		if(my_profile!=undefined && db_users!=undefined && message_counter==0) {
    			console.log(db_messages);
 				res.render('chat', {"users": db_users, "curr_user": my_profile,
 							 "messages": db_messages})
 			}  	
    	}
    }

 	if(my_profile!=undefined && db_users!=undefined && message_counter==0) {
 		console.log(db_messages);
 		res.render('chat', {"users": db_users, "curr_user": my_profile,
 					 "messages": db_messages})
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

