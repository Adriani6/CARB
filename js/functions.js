window.onscroll = function(){
	if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
	    $("#navSearchBar").show();
	    $(".navbar").show();
    } else {
	    $("#navSearchBar").hide();
	    $(".navbar").hide();
    }
}