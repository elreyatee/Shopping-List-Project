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

var latitude, longitude;

var showPosition = function(position) {
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
};

if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(showPosition);
} else {
	alert('Geolocation not supported!');
}

/*'https://api.foursquare.com/v2/venues/categories?id=4bf58dd8d48988d118951735&' + 
					'client_id=HNXJ1F11JAIGT35BBDTOVWVCBJZFL3KCFPQ4ROQAYDI2K1S3&' +
					'client_secret=SUGSAPYIMQJATTX41EOIJ4T3QML21I5V15HXNJLL0BKT54BG&v=20140618'*/

$(document).ready(function() {

	$('#menu-bar').on('click', 'li a img[alt="Foursquare"]', function(event) {
		event.preventDefault();

		// Data we are requesting from Foursquare
		var request = {
				'categories': 'Grocery Store'
		}

		var foursquare = $.ajax({
				url: 'http://api.foursquare.com/v2/venues/search?ll=' + latitude + ',' + longitude +
					 '&limit=10&client_id=HNXJ1F11JAIGT35BBDTOVWVCBJZFL3KCFPQ4ROQAYDI2K1S3&' +
					 'client_secret=SUGSAPYIMQJATTX41EOIJ4T3QML21I5V15HXNJLL0BKT54BG&v=20140619',
				data: request,
				dataType: 'jsonp',
				data: request,
				success: function(result) {
					console.log('success!');
				}
		}).done(function(result) {
			console.log(result.response.venues);
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