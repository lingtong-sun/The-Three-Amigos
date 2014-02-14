var data = require('../conversation.json');

exports.viewConversation = function(req, res){
	var name = req.params.name;
  	console.log("The name is: " + name);
  	console.log(data);
  	res.render('conversation', {
  		'name' : name,
  		'data' : data
  	});
};