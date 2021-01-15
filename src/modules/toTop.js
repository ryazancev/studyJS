const toTop = () => {
	const 
		arrowTop = document.getElementById('totop'),
		topMenu = document.querySelector('.top-menu'),
		domRect = topMenu.getBoundingClientRect();

	arrowTop.style.display = 'none';
	window.addEventListener('scroll', () => {

		if (document.documentElement.scrollTop < 594)  {
			arrowTop.style.display = 'none';
		} else {
			arrowTop.style.display = 'block';
		}

		// Привяжем бургер меню при скроле
		if (document.documentElement.clientWidth < 768) {
			if (document.documentElement.scrollTop >= domRect.top) {
				topMenu.style.position = 'fixed';
			} else {
				topMenu.style.position = '';
			}
		}
	});

};

export default toTop;
