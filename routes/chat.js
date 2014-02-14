var data = require('../friends.json');

exports.view = function(req, res){
  console.log(data);
  res.render('chat', data);
};