var data = require('../users.json');

var models = require('../models');

exports.view = function(req, res){
  console.log(req.session.user_id);

  var current_user = "0";
  var db_data = new Array();
  models.Friend
  		.find({"user_one": current_user})
  		.exec(afterFindFriends);

  function afterFindFriends(err, friends) {
    if(err) console.log(err);
    //console.log(friends);
    var counter = 0;
    for (var i=0; i < friends.length; i++) {
    	var json = friends[i];
    	var friend_id = json['user_two'];
    	
    	models.User
    		  .find({"facebook_id": friend_id})
    		  .exec(afterGrabbingUserData);

    	function afterGrabbingUserData(err, users) {
    		if(err) console.log(err);
    		console.log(users);
    		db_data[counter] = users[0];
    		counter ++;
    		console.log(counter + " " + friends.length);
    		if (counter == friends.length) {
    			console.log(db_data);
   				res.render('chat', { "users" : db_data });
    		}
    	}
    }
   	
  }
};

