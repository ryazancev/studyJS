const getFixed = (elem, prevElem) => {
	const domRect = prevElem.getBoundingClientRect();

	if (document.documentElement.scrollTop >= domRect.height) {
		elem.style.position = 'fixed';
	}

	if (document.documentElement.scrollTop < domRect.height) {
		elem.style.position = '';
	}
};

export default getFixed;

