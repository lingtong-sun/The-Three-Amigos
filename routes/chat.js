var models = require('../models');

exports.view = function(req, res){
  req.session.startTime = new Date().getTime();
  console.log("chat.js --> " + req.session.user_name + " has ID: " + req.session.user_id);
  console.log("chat.js --> start time var: " + req.session.startTime);

  var friendList = req.session.friends;
  //console.log("Friends: " + friendList);

  var current_user = req.session.user_id;
  var db_users;
  var db_messages = new Array();
  var my_profile;

  var message_counter = 0;
  models.User 
		  .findOne({"_id": current_user})
		  .exec(setFriend);
  function setFriend(err, me) {
   	if (err) console.log(err);
   	my_profile = me;
   //	console.log(me);
   	if(my_profile!=undefined && db_users!=undefined && message_counter==0) {
   		//console.log(db_messages);
      if(req.session.versionA) {
 		     res.render('chat', {"users": db_users, "curr_user": my_profile,
 				 "messages": db_messages, "versionA" : true})
      } else {
        res.render('chat', {"users": db_users, "curr_user": my_profile,
         "messages": db_messages, "versionA" : false})
      }
 	}  	
  }

  models.Friend
  		.find({"user_one": current_user})
  		.populate("user_two")
  		.exec(afterFindFriends);

  function afterFindFriends(err, friends) {
    if(err) console.log(err);
  //  console.log(friends);
    db_users = friends;
    for (var i=0; i < friends.length; i++) {
    	if (friends[i]['conversation_id'] >= 0) message_counter++;
    }

    for (var i=0; i<friends.length; i++) {
    	models.Message 
    		  .find({"conversation": friends[i]["conversation_id"]})
    		  .populate("sender")
    		  .populate("recipient")
    		  .sort("-send_time")
    		  .exec(afterFindMessages);

    	function afterFindMessages(err, messages) {
    		if(err) console.log(err);
      //  console.log(messages);
    		if (messages.length == 0) return;
    		var friend = messages[0]['sender'];
    		if (messages[0]['sender']['_id'] == current_user) friend = messages[0]['recipient'];
    		db_messages.push({"friend": friend, "message": messages[0]});
    		message_counter--;
    		if(my_profile!=undefined && db_users!=undefined && message_counter==0) {
    //			console.log(db_messages);
     				if(req.session.versionA) {
              res.render('chat', {"users": db_users, "curr_user": my_profile,
              "messages": db_messages, "versionA" : true})
            } else {
              res.render('chat', {"users": db_users, "curr_user": my_profile,
              "messages": db_messages, "versionA" : false})
            }
        }  	
    	}
    }

 	if(my_profile!=undefined && db_users!=undefined && message_counter==0) {
 	//	console.log(db_messages);
 		if(req.session.versionA) {
      res.render('chat', {"users": db_users, "curr_user": my_profile,
      "messages": db_messages, "versionA" : true})
    } else {
      res.render('chat', {"users": db_users, "curr_user": my_profile,
      "messages": db_messages, "versionA" : false})
    }
 	}  	
  }
};