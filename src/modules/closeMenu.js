const closeMenu = () => {
	const popupMenu = document.querySelector('.popup-menu');

	popupMenu.addEventListener('click', event => {
		const target = event.target;

		if (target.closest('.popup-menu')) {
			popupMenu.style.display = '';
		}
	});
};

export default closeMenu;
