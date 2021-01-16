import getFixed from "./getFixed";

const toTop = () => {
	const
		arrowTop = document.getElementById('totop'),
		topMenu = document.querySelector('.top-menu');

	arrowTop.style.display = 'none';
	window.addEventListener('scroll', () => {

		if (document.documentElement.scrollTop < 594)  {
			arrowTop.style.display = 'none';
		} else {
			arrowTop.style.display = 'block';
		}

		// Привяжем бургер меню при скроле
		if (document.documentElement.clientWidth < 768) {
			getFixed(topMenu);
		} else {
			return;
		}
	});

};

export default toTop;
