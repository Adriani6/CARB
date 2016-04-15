var _0xe14c=["\x38\x32\x36\x32\x34\x38\x63\x36\x39\x33\x61\x38\x34\x65\x62\x63\x39\x35\x64\x38\x37\x36\x33\x38\x32\x32\x38\x30\x62\x30\x38\x39"];
var api = {
	client:_0xe14c[0]
}

var app = {
	json : undefined,
	suggestions : undefined,
	random_tags: undefined,
	mediaJson: undefined
}

var functions = {

	start: function(query){
		functions.loaderStart();
		var callback = "https://api.instagram.com/v1/tags/"+query+"/media/recent?client_id="+api.client;
		return $.ajax({
			type: 'POST',
			url: callback,
			dataType: "jsonp",
			success: function(data){
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
	
	loaderStart: function(){
		 $("body").append("<span id='loader'><img src='img/loader.gif'>Loading..</span>");
	},

	loaderStop: function(){
		 $("#loader").remove();
	},

	appendImages: function(iO){
		$("<div class='comb'><img data-mediaId='"+iO.id+"' data-tag='"+app.json.tag+"' data-url='"+iO.link+"' src='"+iO.images.standard_resolution.url+"'><span>"+iO.caption.from.full_name+"<br>Likes: "+iO.likes.count+"<br>Comments: "+iO.comments.count+"</span></div>").appendTo("#images");	
	}
}

var appWindow = {
//Implement window pop ups, listeners etc.
	open: function(){
		$("#window").css('visibility', 'visible');
	},
	close: function(){
		$("#window").css('visibility', 'hidden');
		$("#window > .image > img").replaceWith("<img src='#'>");
		$("#window > .details-bar > .details").html("");
	},
	loadData: function(mediaId){
		functions.loaderStart();
		var rO = functions.mediaQuery(mediaId);
		
		$.when(rO).done(function(){
			var res = rO.responseJSON;
			$("#window > .image > img").replaceWith("<img src='"+res.data.images.standard_resolution.url+"'>");
			$("#window > .details-bar > .details").html("Likes: " + res.data.likes.count + " Comments: " + res.data.comments.count + " Tags: "+ res.data.tags.length + " People on Photo: "+res.data.users_in_photo.length+"<span id='goTo'><a href='"+res.data.link+"'>View Instagram Post</a></span>");
			functions.loaderStop();
		});
	}
}

$(document).ready(function(){
	function loop() {
	    $('.arrow').animate({'bottom': '50'}, {
	        duration: 1000, 
	        complete: function() {
	            $('.arrow').animate({bottom: 20}, {
	                duration: 1000, 
	                complete: loop});
	    }});
	}

	loop();

	$(function(){
	  $(window).scroll(function(){
	    var aTop = $(window).height() / 3;
	    if($(this).scrollTop()>=aTop){
	        $(".arrow").css("visibility", "hidden");
	        // instead of alert you can use to show your ad
	        // something like $('#footAd').slideup();
	    }else{
	    	$(".arrow").css("visibility", "visible");
	    }
	  });
	});
})