'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$("#settingform").submit(formSubmit);
	$("#sendmessage").click(newMessage);
}

function newMessage(e) {
	e.preventDefault();
	console.log("NEW MSG");
	var form = $("#messageform");
	console.log(form.serialize());
	$.post(form.attr("action"), form.serialize(), displayResults);
	
}

function formSubmit(e){
	e.preventDefault();
	console.log("SUBMIT FORM");
	var form = $("#settingform");
	console.log(form.serialize());
	$.post(form.attr("action"), form.serialize(), displaySettingResults);
}

function displayResults (result) {
	console.log(result);
	location.href = "/conversation/"+result["_id"]+"#bottom";
//	location.reload();
}

function displaySettingResults (result) {
	location.reload();
}