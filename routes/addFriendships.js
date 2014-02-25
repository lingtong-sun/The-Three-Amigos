var models = require('../models');

exports.addFriendships = function(req, res) {
	console.log("addFrienships.js --> Username: " + req.session.user_name + ", ID: " + req.session.user_id);

	var friendList = req.session.friends;
  var current_user = req.session.user_id;
  var counter = 2 * friendList.length;

  // ADD Spanglish Familia AS FRIEND
  var userToSpang = new models.Friend ({
    "user_one" : req.session.user_id,
    "user_two" : "100007836281209",
    "conversation_id" : -1
  });
  userToSpang.save(afterAddSpang);

  var spangToUser = new models.Friend ({
    "user_one" : "100007836281209",
    "user_two" : req.session.user_id,
    "conversation_id" : -1
  });
  spangToUser.save(afterAddSpang);
                  
  function afterAddSpang(err) {
    console.log("addFriendships.js --> Spanglish Familia added")
  } 

  // Iterate over friend list and add friendships in both directions
	for(var i = 0; i < friendList.length; i++) {
        
        // get one of the user's Facebook friends --> check if the friend uses Spanglish
        models.User
        	.findOne({"_id": friendList[i]})
        	.exec(checkIfFriendUsesSpanglish);

        function checkIfFriendUsesSpanglish(err, friend) {
           	if(err) console.log(err);
           	if (friend === null) {
            // friend does not use Spanglish
           		counter -=2;
                if(counter == 0) {
                	res.redirect("/chat");
                }
            } else {
            // friend does use Spanglish --> add a friendship in both directions
	            var newFriendshipOne = new models.Friend ({
	                "user_one" : req.session.user_id,
	                "user_two" : friend.id,
	                "conversation_id" : -1
	            });
                newFriendshipOne.save(afterAddFriend);

	            var newFriendshipTwo = new models.Friend ({
	                "user_one" : friend.id,
	                "user_two" : req.session.user_id,
	                "conversation_id" : -1
	            });
                newFriendshipTwo.save(afterAddFriend);
	                
	            function afterAddFriend(err) {
	                counter --;
	                if (counter ==0) {
	                 	res.redirect("/chat");
	                }
	            } 
            }
        }
    }
};