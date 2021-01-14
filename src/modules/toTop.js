const toTop = () => {
	const arrowTop = document.getElementById('totop');

	arrowTop.style.display = 'none';
	window.addEventListener('scroll', () => {
		if (document.documentElement.scrollTop < 594)  {
			arrowTop.style.display = 'none';
		} else {
			arrowTop.style.display = 'block';
		}
	});

};

export default toTop;
