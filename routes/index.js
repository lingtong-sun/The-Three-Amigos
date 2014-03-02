/*
 * GET home page
 */

exports.view = function(req, res){
	req.session.versionA = true;
	var data = {'versionA' : true};

	res.render('index', data);
};

exports.viewAlt = function(req, res){
	req.session.versionA = false;
	var data = {'versionA' : false};

	res.render('index', data);
};