var _0xe14c=["\x38\x32\x36\x32\x34\x38\x63\x36\x39\x33\x61\x38\x34\x65\x62\x63\x39\x35\x64\x38\x37\x36\x33\x38\x32\x32\x38\x30\x62\x30\x38\x39"];
var api = {
	client:_0xe14c[0]
}

var app = {
	json : undefined,
	suggestions : undefined,
	random_tags: undefined
}

var functions = {

	start: function(query){
		var callback = "https://api.instagram.com/v1/tags/"+query+"/media/recent?client_id="+api.client;
		return $.ajax({
			type: 'POST',
			url: callback,
			dataType: "jsonp",
			success: function(data){app.json = data.data;}
		});
	},
	
	iterate: function(json){
		for(var i = 0; i < Object.keys(json).length; i++){
			return json[i];
		} 
	},

	appendImages: function(iO){
		$("<div class='comb'><img data-url='"+iO.link+"' src='"+iO.images.standard_resolution.url+"'><span>"+iO.caption.from.full_name+"<br>Likes: "+iO.likes.count+"<br>Comments: "+iO.comments.count+"</span></div>").appendTo("#images");	
	}

}
