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

var showResults = function(query) {
	
	var clone = $('.results').clone();
	
	$(clone).find('dd[class="store_name"]').text(query.name);
	$(clone).find('dd[class="store_address"]').text(query.location.address);
	$(clone).find('dd[class="store_city"]').text(query.location.city);
	$(clone).find('dd[class="store_phone"]').text(query.contact.formattedPhone);
	//1 meter = 0.000621371 miles
	$(clone).find('dd[class="store_distance"]').text((query.location.distance * 0.000621371).toFixed(2) + ' miles away');

	return clone;
};

var getLocalStores = function () {

	$('.address_getter').submit(function(event) {
		event.preventDefault();
		var address = $(this).serialize();

		//Get Geocode from user input using Google API
		$.ajax({
			url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyBgvHM6ssIauA7ifScJja7-om1KzGoVnSs',
			success: function(result) {
				var latitude = result.results[0].geometry.location.lat;
				var longitude = result.results[0].geometry.location.lng;
				latitude.toString();
				longitude.toString();

				var coordinates = latitude + ',' + longitude;

				// Data we are requesting from Foursquare
				var foursquare = $.ajax({
					url: 'http://api.foursquare.com/v2/venues/search?ll=' + coordinates,
					data: {categoryId: '4bf58dd8d48988d118951735',
						   limit: '5',
						   client_id: 'HNXJ1F11JAIGT35BBDTOVWVCBJZFL3KCFPQ4ROQAYDI2K1S3',
						   client_secret: 'SUGSAPYIMQJATTX41EOIJ4T3QML21I5V15HXNJLL0BKT54BG',
						   v: '20140623'},
					dataType: 'jsonp',
				}).done(function(foursquare) {

					//console.log(foursquare);
					var ven = foursquare.response.venues;
					//console.log(ven);
					var result = [];
					
					for(var i = 0; i < ven.length; i++) {
						//This is a closure
						(function(index) {
							
							result[index] = showResults(ven[index]);

						})(i);
					}
					$('.results-container').append(result);
					$('.results-container').slideDown('fast');
				});
			}
		});
	});
};

$(document).ready(function() {

	$('.address_bar').hide();
	$('.results_window').hide();
	$('.results-container').hide();

	$('#menu-bar').on('click', 'li a img[alt="Foursquare"]', function(event) {
		event.preventDefault();
		$('.address_bar').slideToggle("fast");
		getLocalStores();
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