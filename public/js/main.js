$(function () {
	var url = window.location.href;
	$('li a').each(function () {
		if (url == this.href) {
			$(this).closest('li').addClass('active');
			$(this).parents('li').addClass('active');
		}
	});
});
window.onload = function () {
	let cards = document.querySelectorAll('.card');
	cards.forEach(function (card) {
		card.addEventListener('mouseover', function () {
			this.querySelector('.card-img-top').style.transform = 'scale(1.1)';
			this.querySelector('.overlay').style.opacity = '0.85';
			this.querySelector('.overlay').style.transform = 'scale(1.1)';
			this.querySelector('.card-image-container').style.zIndex = '50';
		});
		card.addEventListener('mouseout', function () {
			this.querySelector('.card-img-top').style.transform = 'scale(1)';
			this.querySelector('.overlay').style.opacity = '0';
			this.querySelector('.overlay').style.transform = 'scale(0.8)';
		});
	});
};

// document.querySelectorAll('.categories-text').forEach(function (el) {
// 	el.innerHTML = el.innerHTML.split('', 2).join('').padEnd(5, '.');
// });