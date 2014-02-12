// Get all of our friend data
var data = require('../friends.json');

exports.view = function(req, res){
  console.log(data);
  res.render('index', data);
};