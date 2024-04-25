$(function () {
	var url = window.location.href;
	$('li a').each(function () {
		if (url == this.href) {
			$(this).closest('li').addClass('active');
			$(this).parents('li').addClass('active');
		}
	});
});


// document.querySelectorAll('.categories-text').forEach(function (el) {
// 	el.innerHTML = el.innerHTML.split('', 2).join('').padEnd(5, '.');
// });
