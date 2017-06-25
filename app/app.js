$(document).ready(function() {
  $('#play-video').on('click', function(ev) {
 
    $("#video")[0].src += "&autoplay=1";
    ev.preventDefault();
 
  });

    $('.carousel').carousel({
  interval: 2000
})

});

// allows on button click to play embedded youtube video