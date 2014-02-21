
var models = require('../models');

exports.send = function(req, res){
  console.log(req['body']);
  verifyUsers(req, res);
  //send the message to db
};

function verifyUsers(req, res) {
  var recipient = req['body']['recipient'];
  if (recipient == "") {
    recipient = req.session.recipient;
    models.User
          .findOne({"_id": recipient})
          .exec(afterFindUser);
  }
  else {
    var name = req['body']['recipient'];
    models.User  
          .findOne({"name": name})
          .exec(afterFindUser);

  }

  function afterFindUser(err, user) {
    if (err) console.log(err);
    if (user == null) {
      recipient = null;
      return; //MOAR ERROR CHECKING
    }
    console.log(user);

    recipient = user['_id'];
    translate(req, res, recipient);
  }
}

var MsTranslator = require('mstranslator');
var client = new MsTranslator({client_id:"spanglish147", 
		client_secret: "QGgmDY7HUnO2723aK3E4kiXn46kaE1leXQYIme3huow="});
	

function translate(req, res, recipient) {

  var source = req['body']['message'];

  //var recipient = req.session.recipient;
  var my_id = req.session.user_id;
  console.log("TRANSLATE: " + my_id + "---> " + recipient);
  models.Friend
        .findOne({"user_one": my_id, "user_two": recipient})
        .populate("user_one")
        .populate("user_two")
        .exec(afterFindFriendship);


  function afterFindFriendship(err, friendship) {
    if (err) console.log(err);
    console.log(friendship);

    //need to do error handling here
    if(friendship == null) return;
    var conversationID = friendship['conversation_id'];

    var params = { 
      text: source,
      from: friendship['user_one']['send_language'],
      to: friendship['user_two']['receive_language']
    };

    if(friendship['conversation_id'] < 0) {
      models.Friend
            .find()
            .sort("-conversation_id")
            .exec(findMaxConvoID);

      function findMaxConvoID(err, friends) {
        if(err) console.log(err);
        if(friends.length == 0) return;
        conversationID = friends[0]['conversation_id'] + 1;
        // models.Friend
        //       .find({"user_one": my_id, "user_two": recipient})
        //       .update({"conversation_id": conversationID})
        //       .exec(changeConvoID);
        models.Friend.update({"user_one": my_id, "user_two": recipient},
          {"conversation_id": conversationID}, {"multi": true}, changeConvoID);

        function changeConvoID(err) {
          if(err) console.log(err);
          console.log("CHANGED CONVO ID: " + conversationID);
          client.initialize_token(after_initialize_token);      
        }
      }
    } else {
      client.initialize_token(after_initialize_token);
    }
    
    function after_initialize_token(keys){ 
       console.log(keys.access_token);
       client.translate(params, function(err, data) {
          console.log(data);

          var newMessage = models.Message({
              "sender": friendship['user_one']['_id'],
              "recipient": friendship['user_two']['_id'],
              "original": source,
              "translated": data,
              "conversation": conversationID
          });
          newMessage.save(afterSaving);

          function afterSaving(err) {
            if(err) console.log(err);
            res.send();
            //res.redirect("/conversation/"+friendship['user_two']['_id']);
          }
          //send the message into the database
      });
    }
  }

	
}



// };

// function translate(req, res) {
// 	console.log("WHY");

// 	var dataMarketUri = "https://datamarket.accesscontrol.windows.net/v2/OAuth2-13";

//  //    var fromLang = "en";
//  //    var translatedText = "";
//  //    var tobetranslated = req['body']['message'];
//  //    var toLang = "es";
// 	// var uri = "http://api.microsofttranslator.com/v2/Http.svc/Translate?appId=" + bingId + "&text=" + tobetranslated + "&from=" + fromLang + "&to=" + toLang;
// 	var client_id = encodeURIComponent("spanglish147");
// 	var client_secret = encodeURIComponent("QGgmDY7HUnO2723aK3E4kiXn46kaE1leXQYIme3huow=");
// 	// var scope = "http://api.microsofttranslator.com";
// 	// var grant_type = "client_credentials";

// 	var params = "grant_type=client_credentials&client_id="+client_id+"&client_secret="+client_secret+"&scope=http://api.microsofttranslator.com";
// 	var xmlHttp = new XMLHttpRequest();
	
// 	xmlHttp.open("POST", dataMarketUri, false);

// 	xmlHttp.setRequestHeader("Content-type", "text/plain; charset=UTF8");
	
// 	xmlHttp.send(params);
// 	var response = JSON.parse(xmlHttp.responseText);
// 	//console.log(xmlHttp.getAllResponseHeaders());
// 	//console.log(response);
// 	console.log(response['error_description']);
// 	//console.log(params);
// };