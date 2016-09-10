$(document).ready(function(){
  $('.homepageHero').slick({
    dots: true,
	infinite: true,
	speed: 300,
	slidesToShow: 1,
	fade: true,
	adaptiveHeight: true,
  variableWidth: true
  });

  $('#nav').affix({
        offset: {
          top: $('#header').height()
        }
  });
});