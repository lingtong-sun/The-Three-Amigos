var models = require('../models');

exports.addUser = function(req, res) {
	console.log("addUser.js --> Username: " + req.session.user_name + ", ID: " + req.session.user_id);
	
  var current_user = req.session.user_id;

  models.User
    .findOne({"_id": current_user})
  	.exec(defineUser);

  function defineUser(err, me) {
  	if(err) console.log(err);
	
		var newUser = new models.User ({
         	"_id": req.session.user_id,
        	"name" : req.session.user_name,
         	"send_language" : "en",
         	"receive_language" : "es",
          "image" : "http://graph.facebook.com/" + req.session.user_id + "/picture?type=square"
    });

    newUser.save(addFriends);

    function addFriends(err) {
      if(err) console.log(err);
      console.log("addUser.js --> user added successfully");

      res.redirect("/addFriendships");
    }
  }
};