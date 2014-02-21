var data = require('../friends.json');

exports.view = function(req, res){
  console.log(data);
  queryFriends();
  res.render('chat', data);
};