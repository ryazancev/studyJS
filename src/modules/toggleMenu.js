// Menu
const toggleMenu = () => {
	const
		btnMenu = document.querySelector('.menu'),
		menu = document.querySelector('menu'),
		btnScroll = document.querySelector('[href="#service-block"]');

	const handlerMenu = () => {
		if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
			menu.style.transform = `translate(0)`;
		} else {
			menu.style.transform = `translate(-100%)`;
		}
	};

	btnMenu.addEventListener('click', handlerMenu);
	menu.addEventListener('click', event => {
		event.preventDefault();

		const target = event.target;

		if (target.matches('a')) {
			const blockID = target.hash.substr(1);

			document.getElementById(blockID).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}

		if (target.classList.contains('close-btn') || target.tagName === 'A') handlerMenu();
	});
	btnScroll.addEventListener('click', event => {
		event.preventDefault();

		const blockID = btnScroll.hash.substr(1);

		document.getElementById(blockID).scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	});
};

export default toggleMenu;
