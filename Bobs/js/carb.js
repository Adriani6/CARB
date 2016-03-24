$(document).ready(function(){
	function hasCookies(){
		if(document.cookie)
			return true;
		else
			return false;
	}

	function createCookie(){
		if(!hasCookies()){
			var expiry = new Date();
			//1 year expiry on cookie.
            		expiry.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000));
			document.cookie = "tags=" + "" + ';expires=' + expiry.toUTCString();
		}	
	}

	function addTagToCookie(tag){

	}

});
