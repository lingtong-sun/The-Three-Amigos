/*
 * GET home page
 */

exports.view = function(req, res){
  res.render('index', {
  	userid: req.session.userid
  });
};