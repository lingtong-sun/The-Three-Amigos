'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	$(".convo-link").on("click", function() {
		window.document.location = $(this).attr("href");
	});


  console.log("hello?");

$('input.counties').typeahead({
      name: 'countries',
      local: ["Unites States", "Mexico", "Canada", "Cuba", "Guatemala"]
}).on('typeahead:selected', function(event, datum) {
	console.log("meow");
});


$('#save').on("click", function() {
	$('#save-notice').show();

	//$("#sendlang").val("es");
	
	console.log("kasjdfhd");
});


})


