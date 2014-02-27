'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	$(".convo-link").on("click", function() {
		window.document.location = $(this).attr("href");
	});

	$('#save').on("click", function() {
		
		$('#save-notice').show();	

		$('#settings1').addClass("active");		
	});


})


