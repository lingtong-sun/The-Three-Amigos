

exports.send = function(req, res){
  console.log(req['body']);

  translate(req['body']['message']);
};


var MsTranslator = require('mstranslator');
var client = new MsTranslator({client_id:"spanglish147", 
		client_secret: "QGgmDY7HUnO2723aK3E4kiXn46kaE1leXQYIme3huow="});
	

function translate(source) {

	var params = { 
  		text: source,
  		from: 'en',
  		to: 'es'
	};

	client.initialize_token(function(keys){ 
  		console.log(keys.access_token);
  		client.translate(params, function(err, data) {
   	   		console.log(data);
  		});
	});
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