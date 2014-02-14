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
}

function formSubmit(e){
	e.preventDefault();
	console.log("SUBMIT FORM");
	var form = $("#settingform");
	console.log(form.serialize());
	$.post(form.attr("action"), form.serialize(), displayResults);
}

function displayResults (result) {

}