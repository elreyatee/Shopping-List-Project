var playPapersound = function () {
	$('#bag-sound')[0].volume = 0.5;
	$('#bag-sound')[0].load();
	$('#bag-sound')[0].play();
};

var clearField = function () {
	$('#input-field').val('');
};

var focusInput = function () {
	$('#input-field').focus();
};

var getURL = function() {

	if(!navigator.geolocation) {
		alert("Geolocation is not supported by your browser!");
		return;
	}
 
	var success = function(position) {
		console.log("Latitude: " + position.coords.latitude + " & Longitude: " + position.coords.longitude);
		latlon = position.coords.latitude + ',' + position.coords.longitude;
	}

	navigator.geolocation.getCurrentPosition(success);
};

//Init
var oauth = OAuth({
	consumer: {
		public: 'kV4eJDAd5AFOzGyMYhQpyQ',
		secret: 'olcIRixTohwU94qouGwV4VEcn9E'
	},
	signature_method: 'HMAC-SHA1'
});

// Request Data
var request_data = {
	url: 'http://api.yelp.com/v2/search?term=grocery&limit=5&sort=2&ll=San+Francisco',
	method: 'POST',
	data: {
		status: 'Hello!'
	}
};

// Token info
var token = {
	public: 'zM2_GgTAJTV1KwIwp7iC1FPBtObaTYKw',
	secret: 'K9AQEMBhDeC-ZeYY--QvZAprk0o'
};

$(document).ready(function() {

	$('#menu-bar').on('click', 'li a img[alt="Yelp"]', function(event) {
		event.preventDefault();

		var yelpResult = $.ajax({
				url: request_data.url,
				jsonp: 'callback',
				dataType: 'jsonp',
				type: request_data.method,
				data: oauth.authorize(request_data, token)
			}).done(function(data) {
				console.log('success!');
		});
	});

	focusInput();

	$('#clear-field').on('click', function() {
		clearField();
	});

	$('#add-item').on('click', function(event) {
		event.preventDefault();
		var item = $('#input-field').val();

		if(item !== '') {
			playPapersound();
			$('<div><p>' + item + '</p><a href="#" id="clear-field" class="basket-controls"></a></div>')
				.appendTo('#shopping-bag')
				.addClass('bag-item');
			clearField();
			focusInput();
		} else {
			alert('Please enter an item');
		}
		$('.bag-item a').on('click', function() {
			$(this).closest('.bag-item').remove();
			focusInput();
		});
	});

});