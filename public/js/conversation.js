'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$("#sendmessage").click(sendMessage);
}


function sendMessage(e) {
	e.preventDefault();
	var textbox = $("#messagetext");
}