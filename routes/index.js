/*
 * GET home page
 */

exports.view = function(req, res){
	var login = new Date().getTime();
	console.log("index.js --> login time: " + login);
	req.session.startTime = login;
	console.log("index.js --> start time var: " + login);
	req.session.versionA = true;
	var data = {'versionA' : true};

	res.render('index', data);
};

exports.viewAlt = function(req, res){
	req.session.versionA = false;
	var data = {'versionA' : false};

	res.render('index', data);
};