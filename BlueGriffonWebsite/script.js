
      $(window).scroll(function () { 
        var width = $(window).width();
        var scrollDistance = ($(this).scrollTop()/-2);

        if(width >= 1000){
            $('.top-fixed-content').css({'top' : (scrollDistance)+"px"});


        }else{
            $('.top-fixed-content').css({'top' : "0px"});
        }
    	});