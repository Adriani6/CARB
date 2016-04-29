window.onscroll = function(){
	if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
	    $("#navSearchBar").show();
	    $(".navbar").show();
    } else {
	    $("#navSearchBar").hide();
	    $(".navbar").hide();
    }
}

// To Highlight certain tags, loop through data var and force to flip them with set opacity.
var q_num = 0;
var f = functions.start();
var loaded = false;

var g = $.when(f).done(function(){

	console.log(app.json[0]);
	for(var i = 0; i < 10; i++){
		functions.appendImages(app.json[i]);
	}

	var hexo = $(".combs");
	if(hexo.parent().is("#instaWrapper")){hexo.unwrap();}
	$('.honeycombs').honeycombs();
	functions.loaderStop();
});

// Listens for the user to keypress the 'Enter' button
$(document).ready(function(){
	$( "#search" ).keypress(function(args) {
		// If user pushes enter, the query on instagram begins
		if(args.which == 13){
			beginQuery();
			var tag = $("#search").val();
			$("#searchedTags").append("<li><a href='#'>#"+ tag +"</a></li>");
			$("#search").val("")
		}
	});

	//Loads the gathers images on the image grid
	$(document).on('click','#images > div > div',function(){
		//goTo($(this).children("img").attr("data-url"));
		appWindow.open();
		//console.log($(this).children("img").attr("data-mediaId"));
		appWindow.loadData($(this).children("img").attr("data-mediaId"));
	});

	// Closes the connection
	$(document).on('click','#window-close',function(){
		appWindow.close();
	});
});

// Enables the three item menu to be hidden until the user clicks the double downward arrow at the top center
$(document).ready(function () {
	$(".menu-toggle a").click(function () {
		$(".menu").slideToggle(700);
	});
});

// Moves the images to the top when the user clicks the arrow
$(document).ready(function () {
	$("#weeArrow").click(function() {
		$('html, body').animate({
			scrollTop: $(window).height()}, 'slow');
        console.log($(".cContainer").offset().top);
	});
});

// Starts on page load
// Queries Instagram for ten random photos.
function beginQuery(){
	var searchBox = $("#search").val();
    // Formats the search terms
	var tags = searchBox.replace(",", " ").split(" ");

	for(var j = 0; j < tags.length; j++){
		var tagVar = tags[j];
		$("#searched_tags").append("<span><a href='#"+tagVar+"'>"+tagVar+"</a></span>");

		var f = functions.start(tagVar);
		//Add tag to json. it doesn't work by parameter passing...
		var query = $.when(f).done(function(){
			for(var i = 0; i < 10; i++){
				functions.appendImages(app.json[i]);
			}
			var hexo = $("#instaWrapper").html();
			$("#instaWrapper").remove();
			$("#images").append(hexo);
			$('.honeycombs').honeycombs();
			functions.loaderStop();
		});
	}
};

function goTo(url){
	window.location.href=url;
};

// Script for the Firebase database connection. This is run under Adrian's login
var ref = new Firebase("https://incandescent-inferno-6873.firebaseio.com/alanisawesome");
ref.authWithOAuthPopup("facebook", function(error, authData) {
	// Console logs to help the dev to see if it worked or not
    console.log(authData);
	if (error) {
		console.log("Login Failed!", error);
	} else {
		console.log("Authenticated successfully with payload:", authData);

		ref.once("value", function(snapshot) {
			var data = snapshot.val();
            var array = Object.keys(data).map(key >= data[key]);
            console.log(array[0].full_name);
		})
	}
});
