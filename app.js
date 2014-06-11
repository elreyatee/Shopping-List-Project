var longitude, latitude;

$(document).ready(function() {

	function playPapersound () {
		$('#bag-sound')[0].volume = 0.5;
		$('#bag-sound')[0].load();
		$('#bag-sound')[0].play();
	}

	// Epoch unix timestamp
	var ts = Math.round((new Date()).getTime() / 1000);
	console.log(ts);

	// Checks to see if geolocation in browser is enabled
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	}
	else {
		alert("Geolocation is not supported by your browser!");
	}

	function showPosition(position) {
		console.log("Latitude: " + position.coords.latitude + " & Longitude: " + position.coords.longitude);
		longitude = position.coords.longitude;
		latitude = position.coords.latitude;

		var randoms = Math.random().toString(36).slice(2);

		var yelpResult = $.ajax({
			url: 'http://api.yelp.com/v2/search?term=grocery&cll=' +
						latitude + ',' + longitude,
			type: 'POST',
			jsonp: 'callback',
			dataType: 'jsonp',
			headers: {oauth_consumer_key: 'kV4eJDAd5AFOzGyMYhQpyQ',
					  oauth_consumer_secret: 'olcIRixTohwU94qouGwV4VEcn9E',
					  oauth_token: 'zM2_GgTAJTV1KwIwp7iC1FPBtObaTYKw',
					  oauth_signature_method: 'HMAC-SHA1',
					  oauth_signature: '3059b14cc0155f2f489b8564ad4888da5371eb21',
					  oauth_timestamp: ts.toString(),
					  oauth_nonce: randoms}
		}).done(function(data) {
			console.log('Got it!!');
		});
	}

	function clearField () {
		$('#input-field').val('');
	}

	function focusInput () {
		$('#input-field').focus();
	}

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