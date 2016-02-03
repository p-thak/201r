$( document ).ready(function() {
    $('#big_image_btn').click(function(){
	  $('#bryce_img').animate({
	    width: "+=500",
	  }, 4000, function() {
	    // Animation complete.
	  });
	});
});
