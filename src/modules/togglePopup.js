//Popup
const togglePopup = () => {
	const
		popup = document.querySelector('.popup'),
		popupContent = popup.querySelector('.popup-content'),
		popupBtns = document.querySelectorAll('.popup-btn');

	let count = 0,
		popupInterval;

	//Popup Animation
	const popupAnimation = () => {
		// eslint-disable-next-line no-unused-vars
		popupInterval = requestAnimationFrame(popupAnimation);
		count++;

		if (count <= 38) {
			popupContent.style.left = count + '%';
		} else {
			cancelAnimationFrame(popupInterval);
			count = 0;
		}
	};

	popupBtns.forEach(item => {
		item.addEventListener('click', () => {
			popup.style.display = 'block';

			if (screen.width > 768) {
				popupContent.style.left = '0%';
				requestAnimationFrame(popupAnimation);
			}
		});
	});

	popup.addEventListener('click', event => {
		let target = event.target;

		if (target.classList.contains('popup-close')) {
			popup.style.display = '';
		} else {
			target = target.closest('.popup-content');

			if (!target) popup.style.display = '';
		}
	});
};

export default togglePopup;
