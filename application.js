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
	url: 'http://api.yelp.com/v2/search?term=grocery&limit=5&sort=2&location=Oakland',
	method: 'POST'
};

// Token info
var token = {
	public: 'zM2_GgTAJTV1KwIwp7iC1FPBtObaTYKw',
	secret: 'K9AQEMBhDeC-ZeYY--QvZAprk0o'
};

$(document).ready(function() {

	$('#menu-bar').on('click', 'li a img[alt="Yelp"]', function(event) {
		event.preventDefault();

		/*var yelpResult = */
		$.ajax({
				url: request_data.url,
				cache: true,
				type: request_data.method,
				dataType: 'jsonp',
				data: oauth.authorize(request_data, token),
				success: function(data) {console.log('success!');}
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