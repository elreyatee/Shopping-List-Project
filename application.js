function playPapersound() {
	var bagsound = $('#bag-sound');
	bagsound[0].volume = 0.5;
	bagsound[0].load();
	bagsound[0].play();
}

function clearField() { $('#input-field').val(''); }

function focusInput() { $('#input-field').focus(); }

function showResults(query) {
	
	var clone = $('.results').clone();
	
	$(clone).find('dd[class="store_name"]').text(query.name);
	$(clone).find('dd[class="store_address"]').text(query.location.address);
	$(clone).find('dd[class="store_city"]').text(query.location.city);
	$(clone).find('dd[class="store_phone"]').text(query.contact.formattedPhone);

	//1 meter = 0.000621371 miles
	$(clone).find('dd[class="store_distance"]').text((query.location.distance * 0.000621371).toFixed(2) + ' miles away');

	return clone;
}

function clearResults() { $('.results-container').slideUp('fast').empty(); }

function getLocalStores () {

	clearResults();
	var address = $('.address_getter').serialize();
	var googleURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ address;

	$.when(

		//Get Geocode from user input using Google API
		$.getJSON(googleURL, { key: 'AIzaSyBgvHM6ssIauA7ifScJja7-om1KzGoVnSs'}

	)).then(function(data) {

		//Then pass coordinates to Foursquare API call
		var latitude = (data.results[0].geometry.location.lat).toString();
		var longitude = (data.results[0].geometry.location.lng).toString();

		$.ajax({
			url: 'http://api.foursquare.com/v2/venues/search?ll=' + latitude + ',' + longitude,
			data: {categoryId: '4bf58dd8d48988d118951735',
				   limit: '5',
				   client_id: 'HNXJ1F11JAIGT35BBDTOVWVCBJZFL3KCFPQ4ROQAYDI2K1S3',
				   client_secret: 'SUGSAPYIMQJATTX41EOIJ4T3QML21I5V15HXNJLL0BKT54BG',
				   radius: '16000',
				   v: '20140623'},
			dataType: 'jsonp',
		}).done(function(data) {

			var venue = data.response.venues, resultArr = [];
	
			// Load data into an array - creates array of objects
			for(var i = 0; i < venue.length; i++) {
				//This is a closure
				(function(index) {
					
					//fsq_result[index] = showResults(ven[index]);
					resultArr.push(showResults(venue[index]));

				})(i);
			}
			//Load results into container and slidedown to show to viewer
			$('.results-container').append(resultArr).slideDown('fast');
		});
	});
}

$(document).ready(function() {

	var addressBar = $('.address_bar');
	var addressGet = $('.address_getter');
	var container = $('.results-container');

	addressBar.hide();
	container.hide();

	// Click on Foursquare icon to show address bar
	$('#menu-bar').on('click', 'li a img[alt="Foursquare"]', function(event) {
		event.preventDefault();
		addressBar.slideToggle('fast');
		clearResults();
		$('input[name="address"]').val('');
	});

	// Submit information by 'ENTER' key or click 'SUBMIT'
	addressGet.on({
		'submit': function(event){
			event.preventDefault();
			getLocalStores();
		},
		'keyup': function(event){
			if(event.keycode === 13 ) {
				event.preventDefault();
				getLocalStores();
			}
		}
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