window.onscroll = function(){
	if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
		$("#navSearchBar").css("display", "inline-block");
        $(".navbar").css("background-color", "#46494C");
    } else {
    	$("#navSearchBar").css("display", "none");
        $(".navbar").css("background-color", "inherit");
    }
}