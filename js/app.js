//Instagram API client id
var _0xe14c=["\x38\x32\x36\x32\x34\x38\x63\x36\x39\x33\x61\x38\x34\x65\x62\x63\x39\x35\x64\x38\x37\x36\x33\x38\x32\x32\x38\x30\x62\x30\x38\x39"];
//Object with assigned variable.
var api = {
	client:_0xe14c[0]
}

//Our App object with variables.
var app = {
	json : undefined,
	suggestions : undefined,
	random_tags: undefined,
	mediaJson: undefined
}

//Functions object, which allows communication with API.
var functions = {
	//Start function
	start: function(query){
		//Start loading gif
		functions.loaderStart();
		//Callback url
		var callback = "https://api.instagram.com/v1/tags/"+query+"/media/recent?client_id="+api.client;
		//Return the json 
		return $.ajax({
			type: 'POST',
			url: callback,
			dataType: "jsonp",
			success: function(data){
				//Set the data in the object variable
				app.json = data.data;
				app.json.push({'tag':query});
			}
		});
	},

	mediaQuery: function(id){
		var callback = "https://api.instagram.com/v1/media/"+id+"?client_id="+api.client;
		return $.ajax({
			type: 'POST',
			url: callback,
			dataType: "jsonp",
			success: function(data){
				mediaJson = data.data;
			}
		});
	},
	
	//Start of animation function
	loaderStart: function(){
		//Adds gif image to body with apporpriate styling
		 $("body").append("<span id='loader'><img src='img/loader.gif'>Loading..</span>");
	},
	//Stop the animation function
	loaderStop: function(){
		//Removes the image from the body
		 $("#loader").remove();
	},
	//Appends the honeycomb images to section.
	appendImages: function(iO){
		$("<div class='comb'><img data-mediaId='"+iO.id+"' data-tag='"+app.json.tag+"' data-url='"+iO.link+"' src='"+iO.images.standard_resolution.url+"'><span>"+iO.caption.from.full_name+"<br>Likes: "+iO.likes.count+"<br>Comments: "+iO.comments.count+"</span></div>").appendTo("#images");	
	}
}
//Image enlargment window
var appWindow = {
	//Opening the window
	open: function(){
		$("#window").css('visibility', 'visible');
	},
	//Closing the window
	close: function(){
		$("#window").css('visibility', 'hidden');
		$("#window > .image > img").replaceWith("<img src='#'>");
		$("#window > .details-bar > .details").html("");
	},
	//Loading data for the window.
	loadData: function(mediaId){
		//Start the animation
		functions.loaderStart();
		//Media query
		var rO = functions.mediaQuery(mediaId);
		//Wait for media query to finish
		$.when(rO).done(function(){
			//Get the response
			var res = rO.responseJSON;
			//Replace image element
			$("#window > .image > img").replaceWith("<img src='"+res.data.images.standard_resolution.url+"'>");
			//Set text corresponding to the image details
			$("#window > .details-bar > .details").html("Likes: " + res.data.likes.count + " Comments: " + res.data.comments.count + " Tags: "+ res.data.tags.length + " People on Photo: "+res.data.users_in_photo.length+"<span id='goTo'><a href='"+res.data.link+"'>View Instagram Post</a></span>");
			//Turn off the loading gif
			functions.loaderStop();
		});
	}
}

//Load those documents when page has finished loading.
$(document).ready(function(){
	//Bouncing arrow animation code.
	function loop() {
	    $('.arrow').animate({'bottom': '50'}, {
	        duration: 1000, 
	        complete: function() {
	            $('.arrow').animate({bottom: 20}, {
	                duration: 1000, 
	                complete: loop});
	    }});
	}
	//Start looping when page finished loading.
	loop();
	//Arrow control, when page scrolls certain height, hide the arrow so it doesn't interfere with honeycombs.
	$(function(){
	  $(window).scroll(function(){
	  	//Check scroll height
	    var aTop = $(window).height() / 3;
	    if($(this).scrollTop()>=aTop){
	        $(".arrow").css("visibility", "hidden");
	    }else{
	    	$(".arrow").css("visibility", "visible");
	    }
	  });
	});
})