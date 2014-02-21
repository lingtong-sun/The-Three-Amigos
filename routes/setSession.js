var models = require('../models');

exports.setSession = function(req, res){

	var id = req.params.id;
	var name = req.params.name;
	console.log("In setSession - " + id + " and named: " + name);
  
  req.session.user_id = id;
  req.session.user_name = name;
  req.session.friends = req.params.arr;

  var friendList = req.session.friends.split(',');
  console.log(req.params.arr.length);
  var current_user = req.session.user_id;
  console.log(current_user);
  
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
          // check if user has been added, then adjust 
          var counter = 2 * friendList.length;
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
                counter -=2;
                if(counter == 0) {
                  res.redirect("/chat");
                }
                //console.log("Friend does not use spanglish");
              } else {
                //console.log(friend.name + " uses Spanglish --> create friendship!");
                var newFriend = new models.Friend ({
                  "user_one" : req.session.user_id,
                  "user_two" : friend.id,
                  "conversation_id" : -1
                });
                newFriend.save(afterAddFriend);

                var newFriendAlt = new models.Friend ({
                  "user_one" : friend.id,
                  "user_two" : req.session.user_id,
                  "conversation_id" : -1
                });
                newFriendAlt.save(afterAddFriend);
                function afterAddFriend(err) {
                  // models.Friend
                  //   .findOne({"user_two": req.session.user_id})
                  //   .exec(checkFriend);
                  counter --;
                  if (counter ==0) {
                    res.redirect("/chat");
                  }
                  //   function checkFriend(err, friendship) {
                  //     console.log(friendship.user_one + " friends with " + req.session.user_name);
                  //   }
                } 
              }
            }
          }
        }
      } else {
        res.redirect("/chat");
      }
    }
    console.log("Passing new user functions");


    // by this point, either a new user has been created or the new user has been fetched
  //res.redirect("/chat");
};