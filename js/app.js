var api = {
	client: "826248c693a84ebc95d876382280b089",
	json : undefined
}

var functions = {

	start: function(query){
		var callback = "https://api.instagram.com/v1/tags/"+query+"/media/recent?client_id="+api.client;
		return $.ajax({
			type: 'POST',
			url: callback,
			dataType: "jsonp",
			success: function(data){api.json = data.data;}
		});
	}
	

}
