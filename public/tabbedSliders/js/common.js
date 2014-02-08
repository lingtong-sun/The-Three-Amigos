/***
* Tabbed Form
* @author: Tamuir khan <tamuir@emrialo.com>
* @version: 1.0 <1-1-2011>
**/

//When dom is loaded
function ClearClasses(){
	$("#nav li").removeClass();
	}

$(function (){
		$("#nav a").click(function(){
				//check which tab has been clicked
				var getID = $(this).attr("id");
				if(getID == "contact"){
					$("#formWrapper ul").animate({left: "0px"}, { duration: 1000, easing: 'easeInOutCirc' });
					ClearClasses();
					$(this).parent("LI").addClass("current");
				} else if(getID == "quote"){
					$("#formWrapper ul").animate({left: "-99%"}, { duration: 1000, easing: 'easeInOutCirc' });
					ClearClasses();
					$(this).parent("LI").addClass("current");			
				} else if(getID == "demo"){
					$("#formWrapper ul").animate({left: "-199%"}, { duration: 1000, easing: 'easeInOutCirc' });
					ClearClasses();
					$(this).parent("LI").addClass("current");
				} else {
					console.log("Should not reach");
				}
			});
	});