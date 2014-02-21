
exports.setSession = function(req, res){
	var id = req.params.id;
  	req.session.user_id = id;
  	res.redirect("/chat");
};