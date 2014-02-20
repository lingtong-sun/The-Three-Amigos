var data = require('../users.json');

var models = require('../models');

exports.view = function(req, res){
  console.log(data);
<<<<<<< HEAD
  res.render('chat', { "users" : data });
=======

  var current_user = "0";
  var db_data = models.Friend
  					.find("user_one": current_user)
  					.exec(afterFindFriends);

  
  res.render('chat', data);
>>>>>>> d20e9da... moar shit
};