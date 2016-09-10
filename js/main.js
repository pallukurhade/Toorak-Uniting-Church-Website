// Google map initialization
function initializeGoogleMap() {
  var mapCanvas = document.getElementById('map-canvas');

  var myLatlng = new google.maps.LatLng(-37.84201, 145.019623);

  var mapOptions = {
    center: myLatlng,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
  }
  var map = new google.maps.Map(mapCanvas, mapOptions);

  var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Toorak Uniting Church'
  });

  	// Sizing the map with % padding makes the marker off center, this is a hack to roughly center it again
    map.panBy(0, 100);
}

// Rows with the .equalHeight class have their content containers set to have a minimum height equal to the height of the tallest container
function equalHeightColumns() {
	var rows = $(".equalHeight");

 	rows.each(function() {
 		var container = $(this).children().children();

 		container.removeAttr('style');

 		var heights = $(this).children().map(function() {
 			return $(this).outerHeight();
 		}).get();

 		var maxHeight = Math.max.apply(null, heights);

		container.css("min-height", maxHeight);
	});
}

// If the viewport is below the header, display the small header and fix navbar to the top of the window
// Else hide the small header and set the navbar to be statically positioned
function headerWatcher() {
	var headerHeight = $('#header').outerHeight();
	var nav = $('#nav');
	var headerSmall = $('#headerSmall');
	var scroll;
	var active;

	// Set inital state
	if ($(window).scrollTop() > headerHeight) {
		active = 1;
		headerSmall.toggleClass("inactive").toggleClass("active");
		nav.toggleClass("affix").toggleClass("affix-top");
	} else {
		active = 0;
	}

	// Track scroll position
	$(window).scroll(function (event) {
	    scroll = $(window).scrollTop();
	    // If below headerHeight, fix navbar to top and display small header
	    if (scroll > headerHeight && active === 0) {
	    	headerSmall.toggleClass("inactive").toggleClass("active");
	    	nav.toggleClass("affix").toggleClass("affix-top");
	    	active = 1;
	    }
	    // If equal to or above headerHeight, transition the navbar back to be statically positioned and hide the small header
	    if (scroll <= headerHeight && active === 1) {
	    	nav.toggleClass("transitioning").toggleClass("affix");
	    	setTimeout(function() {
	    	    nav.toggleClass("transitioning").toggleClass("affix-top");
	    	    headerSmall.toggleClass("active").toggleClass("inactive");
	    	}, 250)
	    	active = 0;
	    }
	});
}

var nav = function() {
	var navButton = $('.nav-icon');
	var navReady = 1;

	return {
        expand: function() {
        	if (navReady === 1) {
        		navButton.toggleClass('open');
        		navReady = 0;
        		// Cannon toggle the nav button class again until the nav animation is complete
        		setTimeout(function() {
        		    navReady = 1;
        		}, 350) // equal to animation length
        	}
        	event.preventDefault();
        }
	};
}();

// Sets the nav wrapper to the height of the navbar, so the page doesnt jump when the navbar becomes fixed.
var cloneNavHeight = function() {
	var navWrapper = $('#nav-wrapper');
	var navbar = $("#nav");

	navWrapper.height(navbar.height());
}

$(function(){
	// Image carousel initiation options
	$('#homepageHero').slick({
		dots: true,
		infinite: true,
		speed: 300,
		/*autoplay: true,
		autoplaySpeed: 5000,*/
		slidesToShow: 1,
		fade: true,
		adaptiveHeight: true
	});

	$('#homepageHero').show();

	cloneNavHeight();
	equalHeightColumns();
	headerWatcher();
	initializeGoogleMap();

	// When window has finished resizing, execute these functions
	$(window).on("debouncedresize", function( event ) {
		cloneNavHeight();
	    equalHeightColumns();
	});

	// Fastclick initialization MUST BE PLACED LAST FOR IE8 TO WORK
	FastClick.attach(document.body);
});