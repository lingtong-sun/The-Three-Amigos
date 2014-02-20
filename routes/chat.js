var data = require('../friends_copy.json');

exports.view = function(req, res){
  console.log(data);
  res.render('chat', data);
};