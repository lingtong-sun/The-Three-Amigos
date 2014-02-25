/*
  CODE NOT LIVE OR COMPLETE!!!
  Saved from past iteration in which we deleted and added friends on existing user login.

*?

/*
var models = require('../models');

exports.deleteFriendships = function(req, res) {
	console.log("deleteFriendships.js --> Username: " + req.session.user_name + ", ID: " + req.session.user_id);

	var current_user = req.session.user_id;
	var friendList = req.session.friends.split(',');
	var numFriendshipsToDelete = friendList.length * 2;

  res.redirect('/chat');

  for(var friendID in friendList) {
    models.Friend
      .find({"user_one": current_user, "user_two": friendID})
      .remove()
      .exec(afterRemove);

    models.Friend
      .find({"user_one": friendID, "user_two": current_user})
      .remove()
      .exec(afterRemove);

    function afterRemove(err, res) {
      if(err) console.log(err);
      console.log(res);
      console.log("--------------------");
      console.log("--------------------");
      if (res !== 0) {
        console.log("deleteFriendships.js --> " + res["user_one"] + " relationship to " + res["user_two"] + " removed");
      }
    }
  }	

}
*/