var models = require('../models');

exports.queryMessages = function(req, res){
  	console.log("QUERY");
  	
    var my_id = req.session.user_id;
    var friend_id = req.session.recipient;



  	var db_messages = new Array();

  models.Friend
  .findOne({"user_one": my_id,
      "user_two": friend_id})
  .populate("user_two")
  .exec(afterFindFriend);


  function afterFindFriend(err, friend) {
    if(err) console.log(err);
    if (friend == null) return;
    models.Message
      .find({"conversation": friend['conversation_id']})
      .populate("sender")
      .sort("send_time")
      .exec(afterFindMessages);

    function afterFindMessages(err, messages) {
     if(err) console.log(err);
    
      for (var i=0; i < messages.length; i++) {
        if(messages[i]['conversation'] < 0)
          return;

        var type = "sender";
        console.log(messages[i]['sender']['_id'] +", " + friend_id);
        if (messages[i]['sender']['_id'] == friend_id) {
          type = "receiver";
        }
        db_messages.push({"message": messages[i],
                  "type": type});
        
      }
      res.json({"messages": db_messages});
    }
  }
};