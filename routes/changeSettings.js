var models = require('../models');


exports.changeSettings = function(req, res){
	var body =  req['body'];
	console.log(body);
	console.log(body.sendlang);

	var current_user = req.session.user_id;

	models.User
	.find({"_id" : current_user})
	.update({"send_language": body.sendlang,
		"receive_language": body.recievelang })
	.exec(afterUpdating);

	function afterUpdating(err) {
		if(err) console.log(err);
		res.send();

	}
};