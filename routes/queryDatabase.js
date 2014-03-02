var models = require('../models');

exports.queryDatabase = function(req, res){
  	console.log("QUERY");
  	
  	models.Friend
  		.find({"user_one": req.session.user_id})
  		.populate("user_two")
  		.exec(afterGettingUserData);

  	function afterGettingUserData(err, users) {
  		if(err) console.log(err);
  		console.log(users);
  		var return_data= new Array();
  		for (var i=0; i<users.length; i++) {
  			return_data.push(users[i]["user_two"]);
  		}
  		res.json(return_data);
  	}
};