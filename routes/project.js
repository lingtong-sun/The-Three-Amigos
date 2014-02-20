var models = require('../models');

exports.addFriendship = function(req, res) {
	var friendship = req.body;
	console.log(friendship);

	// make a new Friend and save it to the DB
	// MUST send an OK response w/ res.send();

	var newFriendship = new models.Friendship({
    	"user_one" : friendship['user_one'],
		"user_two" : friendship['user_two']
  	});

  	newFriendship.save(afterSaving);

  	function afterSaving(err) {
    	if(err) { console.log(err); res.send(500); }
    	res.send();
  	}	
}