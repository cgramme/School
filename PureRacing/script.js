
$(document).ready(function() {
    var buttonClicked = false;

    $('.clicked').on('click', function() {
        buttonClicked = true;
    });

    setTimeout(function(){
        if(!buttonClicked){
            alert("Click on an article to go to the latest news.");
        }
    }, 3000);

});


    

