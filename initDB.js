
/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.

  IMPORTANT: You should make sure the

      local_database_name

  variable matches its value in app.js  Otherwise, you'll have
  initialized the wrong database.
*/

var mongoose = require('mongoose');
var models   = require('./models');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'spanglish';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

// Do the initialization here

// Step 1: load the JSON data
var users_json = require('./users.json');

// Step 2: Remove all existing documents
models.User
  .find()
  .remove()
  .exec(onceUsersClear); // callback to continue at

// Step 3: load the data from the JSON file
function onceUsersClear(err) {
  if(err) console.log(err);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = users_json.length;
  for(var i=0; i<users_json.length; i++) {
    var json = users_json[i];
    var user = new models.User(json);

    user.save(function(err, user) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + 'users left to save');
      if(to_save_count <= 0) {
        console.log('DONE');
      }
    });
  }
}



// Step 1: load the JSON data
var friends_json = require('./friends.json');

// Step 2: Remove all existing documents
models.Friend
  .find()
  .remove()
  .exec(onceFriendsClear); // callback to continue at

// Step 3: load the data from the JSON file
function onceFriendsClear(err) {
  if(err) console.log(err);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = friends_json.length;
  for(var i=0; i<friends_json.length; i++) {
    var json = friends_json[i];
    var friend = new models.Friend(json);

    friend.save(function(err, friend) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + 'friends left to save');
      if(to_save_count <= 0) {
        console.log('DONE');
      }
    });
  }
}



// Step 1: load the JSON data
var messages_json = require('./messages.json');

// Step 2: Remove all existing documents
models.Message
  .find()
  .remove()
  .exec(onceMessagesClear); // callback to continue at

// Step 3: load the data from the JSON file
function onceMessagesClear(err) {
  if(err) console.log(err);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = messages_json.length;
  for(var i=0; i<messages_json.length; i++) {
    var json = messages_json[i];
    var message = new models.Message(json);

    message.save(function(err, message) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + 'messages left to save');
      if(to_save_count <= 0) {
        console.log('DONE');
        // The script won't terminate until the 
        // connection to the database is closed
        mongoose.connection.close()
      }
    });
  }
}



