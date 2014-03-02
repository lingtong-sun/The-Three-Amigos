'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})



var friends = new Bloodhound({
  datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  limit: 10, 
  prefetch: {
    url: '/querydatabase',
    ttl: 0,
  }
});
 
// initialize the bloodhound suggestion engine
friends.initialize();

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$("#settingform").submit(formSubmit);
	$("#messageform").submit(newMessage);
	$("#recipient").typeahead(null, {
		name: 'friends',
  		displayKey: 'name',
  		source: friends.ttAdapter(),
  		templates: {
  			suggestion: function(friend){
  				return '<div>'
  						+'<img class="img-circle" src="'+friend.image+'" style="float:left">'
  						+'<p>' + friend.name + '</p>'
  						+'</div>';
  			}
  		},
   		autoselect: true,
   		highlight: true,
	});
	// Google Analytics Code
	$("#invite").click(function(e) {
		e.preventDefault();
		ga('send', 'event', 'Invite Friend Button', 'click');
	});
	$("#newmessage").click(function(e) {
		e.preventDefault();
		ga('send', 'event', 'New Message Button', 'click');
	});

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
//	console.log(result);
	if(result == "") {
		console.log("ERROR");
		//need to display error msg TODO
	} else{
		location.href = "/conversation/"+result["_id"];
	}
	
	
//	location.reload();
}

function displaySettingResults (result) {
	location.reload();
}