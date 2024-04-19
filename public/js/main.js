$(function () {
	var url = window.location.href;
	$('li a').each(function () {
		if (url == this.href) {
			$(this).closest('li').addClass('active');
			$(this).parents('li').addClass('active');
		}
	});
});
