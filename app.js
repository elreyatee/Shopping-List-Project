$(document).ready(function() {

	function playPapersound () {
		$('#bag-sound')[0].volume = 0.5;
		$('#bag-sound')[0].load();
		$('#bag-sound')[0].play();
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

	$('#add-item').on('click', function() {
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