var models = require('../models');

exports.setSession = function(req, res){

  req.session.user_id = req.body['id'];
  req.session.user_name = req.body['name'];
  req.session.friends = req.body['friendList'];

  var current_user = req.session.user_id;

  console.log("setSession.js --> " + req.session.user_name + ", ID: " + req.session.user_id + ", Friend[0]:" + req.session.friends[0]);

  models.User
    .findOne({"_id": current_user})
    .exec(checkIfExists);

  function checkIfExists(err, me) {
      if(err) console.log(err);
      if(me === null) {
        // if the user does not exist in the db, first create a new user
        console.log("setSession.js --> initiating addUser script for new user");
        res.redirect("/addUser");
      } else {
        // if the user does exist, send to chat page
        console.log("setSession.js --> sending existing user to chat page");
        res.redirect("/chat");
      }
    }
};