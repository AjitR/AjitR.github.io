$(window).load(function() {
	$('#loader').addClass('is_active');
	setTimeout(function() {
		$('#loader').addClass('is_loaded');
	}, 15000);
});
