
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var mongoose = require('mongoose');

var index = require('./routes/index');
// Example route

var index = require('./routes/index');
var project = require('./routes/project');
var chat = require('./routes/chat');
var conversation = require('./routes/conversation');
var setting = require("./routes/changeSettings");
var sendmessage = require("./routes/sendMessage");
var setsession = require("./routes/setSession");

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'spanglish';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
// Example route
app.get('/chat', chat.view);
app.get('/conversation/:id', conversation.viewConversation);
app.get('/setsession/:id/:name/:arr', setsession.setSession);
app.post("/chat/changeSettings", setting.changeSettings);
app.post("/chat/sendMessage", sendmessage.send);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
