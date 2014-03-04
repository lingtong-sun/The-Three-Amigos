'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	//setInterval("updateConversation(), 15000");
})

$( window ).load(function() {
      window.scrollTo(0, $(document).height());
 });
/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$("#sendmessage").click(sendMessage);
	window.scrollTo(0, $(document).height());
}

function updateConversation() {
	$.get("/queryMessages", displayMessages);

	function displayMessages(result){
		$("#conversationbody").html();
		for(var i=0; i < result.messages.length; i++) {
			var message = result.messages[i].message;
			$("#conversationbody").append(
				'<div class="message well ' + result.messages[i].type+ '">'+
	  				'<img class="img-circle convo-pic" src="' + message.sender.image+ '"/>' +
	  				'<div class="from-date">'
	  					+'<h5>' + message.sender.name+ '</h5>'+
	  					'<p>' + message.send_time+ '</p>' +
	  				'</div>'+
	  				'<p class="msg-text">' + message.translated+ '</p>'+
	  			'</div>'
			);
		}	
		window.scrollTo(0, $(document).height());
	//	console.log("HELLO");
	}
}



function sendMessage(e) {
	e.preventDefault();

	ga('send', 'event', 'Send Message in Convo Button', 'click');

	var textbox = $("#messagetext");
	console.log("SEND MESSAGE");
	var params = "recipient=" + "" + "&message="+textbox.val();
	console.log(params);
	$.post("/chat/sendMessage", params, displayResults);
}

function displayResults(result) {
	location.href = "/conversation/"+result["_id"];
}