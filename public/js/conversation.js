'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

$( window ).load(function() {
  //    window.scrollTo(0, $(document).height());
 });
/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$("#sendmessage").click(sendMessage);
//	window.scrollTo(0, $(document).height());
}


function sendMessage(e) {
	e.preventDefault();
	var textbox = $("#messagetext");
	console.log("SEND MESSAGE");
	var params = "recipient=" + "" + "&message="+textbox.val();
	console.log(params);
	$.post("/chat/sendMessage", params, displayResults);
}

function displayResults(result) {
	location.href = "/conversation/"+result["_id"];
}