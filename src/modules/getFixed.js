const getFixed = elem => {

	console.dir(document.documentElement.scrollTop);

	if (document.documentElement.scrollTop >= elem.offsetTop) {
		elem.style.position = 'fixed';
	}

	if (document.documentElement.clientWidth < 768 || document.documentElement.clientWidth > 580) {
		if (document.documentElement.scrollTop < 140) {
			elem.style.position = '';
		}
	}

	if (document.documentElement.clientWidth < 580 || document.documentElement.clientWidth > 479) {
		if (document.documentElement.scrollTop < 198) {
			elem.style.position = '';
		}
	}

	if (document.documentElement.clientWidth < 479 || document.documentElement.clientWidth > 390) {
		if (document.documentElement.scrollTop < 198) {
			elem.style.position = '';
		}
	}

	if (document.documentElement.clientWidth <= 390) {
		if (document.documentElement.scrollTop < 246) {
			elem.style.position = '';
		}
	}
};

export default getFixed;

