//Detect scrolling, to show/hide nav bar.
window.onscroll = function(){
	//Check height
	if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
		//Show nav bar
	    $("#navSearchBar").show();
	    $(".navbar").show();
    } else {
    	//Hide nav bar
	    $("#navSearchBar").hide();
	    $(".navbar").hide();
    }
}

// To Highlight certain tags, loop through data var and force to flip them with set opacity.
var q_num = 0;
//Get the main function going.
var f = functions.start();
//If page/images loaded
var loaded = false;
//Database variable
var db = undefined;

//Function which allows users to login/log out with facebook and also works as a database connection with Firebase.
function fb_login(){
	//If db variable is undefined it means user is not logged in.
	if(db == undefined){
		//Make a connection with database.
		var ref = new Firebase("https://incandescent-inferno-6873.firebaseio.com/");
			//Facebook Profile id variable.
	        var fbid = undefined;
	        //Try to prompt the user to login or automatically login.
	        ref.authWithOAuthPopup("facebook", function(error, authData) {
		        if (error) {
		        	//Error users couldn't login
		            alert("Login Failed!", error);
		        } else {
		        	//User logged in
		        	fbid = authData.facebook.id;
			        db = new Database(fbid);
			        $.when(db).done(function(){
		        	   	db.getTags(); 
		        	})
		            $("#fullName").html("Welcome, " + authData.facebook.displayName + "!");
		            $("#fblogin").html("Log out");
		        }
	    });
	}else{
		//User logged out
		db = undefined;
		$("#fullName").html("You're not logged in!");
		$("#fblogin").html("Log in");
	}
};

// Wait for functions to load in the above f variable.
var g = $.when(f).done(function(){

	//Loop over 10 random images fetched.
	for(var i = 0; i < 10; i++){
		//Append the images.
		functions.appendImages(app.json[i]);
	}
	//Render the images.
	var hexo = $(".combs");
	if(hexo.parent().is("#instaWrapper")){hexo.unwrap();}
	$('.honeycombs').honeycombs();
	//Turn off the loading gif
	functions.loaderStop();
});

//Load those functions when the whole document is loaded.
$(document).ready(function(){
	// Listens for the user to keypress the 'Enter' button
	$( "#search" ).keypress(function(args) {
		// If user pushes enter, the query on instagram begins
		if(args.which == 13){
			//Begin the query function
			beginQuery();
			//Get the value
			var tag = $("#search").val();
			//Apends the searched tags
			$("#searchedTags").append("<li><a href='#'>#"+ tag +"</a></li>");
			//Clear search bar
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
		//Check to determine wether to slide up/down the nav.
		if ($('.menu').is(':visible'))
			$(".menu").slideUp(700);
		else
			$(".menu").slideDown(700);
	});
});

// Moves the images to the top when the user clicks the arrow
$(document).ready(function () {
	//Listen for click event on particular id element.
	$("#weeArrow").click(function() {
		//Begin the animation
		$('html, body').animate({
			scrollTop: $(window).height()}, 'slow');
	});
	//Listen for click event on particular class element.
	$(".suggestions").click(function(){
		//Begin the animation.
		$(".menu").slideUp(700);
		$('html, body').animate({
        	scrollTop: $("#images").offset().top-100
    	}, 2000);
	});
	//Listen for form submission
	$("form").submit(function(e) { 
		//Cancel the form submission.
		e.preventDefault();
		//Get the value from input box
        var val = $("#navSearch").val();
        //Begin the query
        beginQuery(true);
        //Clear the inputbox
        $("#navSearch").val("");
    });
});

// Starts on page load & when querying
// Queries Instagram for ten random photos or for given hashtag.
function beginQuery(v){
	//Tenary condition, if v = true that means the search in nav bar was used, otherwise the main page one.
	var searchBox = (v == true) ? $("#navSearch").val() : $("#search").val();
    // Formats the search terms
	var tags = searchBox.replace(",", " ").split(" ");
	//Iterate tags
	for(var j = 0; j < tags.length; j++){
		var tagVar = tags[j];
		//Add Tags to Searched Tags
		$("#searched_tags").append("<span><a href='#"+tagVar+"'>"+tagVar+"</a></span>");
		//Start API Query
		var f = functions.start(tagVar);
		//Wait for query to finish (Javascript is single threaded but somehow it executed two functions at the same time).
		var query = $.when(f).done(function(){
			//Iterate over API results
			for(var i = 0; i < 10; i++){
				//Add Images to Section
				functions.appendImages(app.json[i]);
			}
			//A little trick, which stops the honeycombs breaking when adding objects dynamically.
			var hexo = $("#instaWrapper").html();
			$("#instaWrapper").remove();
			$("#images").append(hexo);
			//Render honeycombs
			$('.honeycombs').honeycombs();
			//Stop the loading gif.
			functions.loaderStop();
		});
	}
};

//Function which changes the page to Instagrams post.
function goTo(url){
	//Set url
	window.location.href=url;
};
