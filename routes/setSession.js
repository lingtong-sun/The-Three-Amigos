var models = require('../models');

exports.setSession = function(req, res){

  

	var id = req.params.id;
	var name = req.params.name;
	console.log("In setSession - " + id + " and named: " + name);
  
  req.session.user_id = id;
  req.session.user_name = name;
  //req.session.friends = req.params.arr;

  	//console.log(name);
  	/*
  	// now check if the user exists in the DB
  	models.User
    		  .find({"facebook_id": id})
    		  .exec(afterGrabbingUser);

    function afterGrabbingUser(err, users) {
    		if(err) console.log(err);
    		console.log(users);

    		if (users.length === 0) {
    			console.log("Must create new user, id: " + id);

    			var newUser = new models.Friend({
    				"facebook_id": id,
					"name" : String,
					"send_language" : String,
					"receive_language" : String,
					"image" : String

    			})



    		}
    }
	*/

    // by this point, either a new user has been created or the new user has been fetched
  res.redirect("/chat");
};