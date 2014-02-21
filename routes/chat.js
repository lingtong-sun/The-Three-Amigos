
var models = require('../models');

exports.view = function(req, res){
  console.log(req.session.user_name + " has ID: " + req.session.user_id);
  var friendList = req.session.friends.split(',');
  //console.log("Friends: " + friendList);

  var current_user = req.session.user_id;
  
  var db_users;
  var db_messages = new Array();
  var my_profile;

  models.User
    .findOne({"_id": current_user})
    .exec(checkIfExists);

  function checkIfExists(err, me) {
      if(err) console.log(err);
      if(me === null) {
        console.log("Creating new user");

        var newUser = new models.User ({
          "_id": req.session.user_id,
          "name" : req.session.user_name,
          "send_language" : "en",
          "receive_language" : "es",
          "image" : "http://jasonlefkowitz.net/wp-content/uploads/2013/07/cats-16140154-1920-1080.jpg"
        });
        newUser.save(afterAddUser);

        function afterAddUser(err) {
          // check if user has been added, then adjust friendships
          console.log("NumFriends" + friendList.length);
          for(var i = 0; i < friendList.length; i++) {
            // iterate over friend list and add friendships in both directions
            //console.log(friendList[i]);
            models.User
              .findOne({"_id": friendList[i]})
              .exec(checkIfFriendUsesSpanglish);

            function checkIfFriendUsesSpanglish(err, friend) {
              if(err) console.log(err);
              if (friend === null) {
                //console.log("Friend does not use spanglish");
              } else {
                //console.log(friend.name + " uses Spanglish --> create friendship!");
                var newFriend = new models.Friend ({
                  "user_one" : req.session.user_id,
                  "user_two" : friend.id,
                  "conversation_id" : -1
                });
                newFriend.save(afterAddFriend);
                function afterAddFriend(err) {
                  models.Friend
                    .findOne({"user_one": req.session.user_id})
                    .exec(checkFriend);

                    function checkFriend(err, friendship) {
                      console.log(req.session.user_name + " friends with " + friendship.user_two);
                    }
                }

                var newFriendAlt = new models.Friend ({
                  "user_one" : friend.id,
                  "user_two" : req.session.user_id,
                  "conversation_id" : -1
                });
                newFriendAlt.save(afterAddFriendAlt);
                function afterAddFriendAlt(err) {
                  models.Friend
                    .findOne({"user_two": req.session.user_id})
                    .exec(checkFriend);

                    function checkFriend(err, friendship) {
                      console.log(friendship.user_one + " friends with " + req.session.user_name);
                    }
                } 
              }
            }
          }
        }
      }
    }
    console.log("Passing new user functions");


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
    		  .sort("-send_time")
    		  .exec(afterFindMessages);

    	function afterFindMessages(err, messages) {
    		if(err) console.log(err);
        console.log(messages);
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

