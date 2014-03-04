var models = require('../models');

exports.changeSettings = function(req, res){
	var body =  req['body'];
	console.log(body);
	console.log(body.sendlang);

	var current_user = req.session.user_id;

	console.log(current_user);
	// models.User
	// .findOne({"_id" : current_user})
	// .update({"send_language": body.sendlang},
	// 	{"receive_language": body.recievelang })
	// .exec(afterUpdating);

	 models.User.update({"_id": current_user},
          {"send_language": body.sendlang, "receive_language": body.recievelang}, {"multi": true}, 
          afterUpdating);

	function afterUpdating(err, user) {
		if(err) console.log(err);
		console.log(user);
		console.log("UPDATED");
		res.send();
	}
};


