'use strict';

window.addEventListener('DOMContentLoaded', () => {

	//Timer

	//Меню
	const toggleMenu = () => {
		const
			btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu');

		const handlerMenu = () => {
			if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
				menu.style.transform = `translate(0)`;
			} else {
				menu.style.transform = `translate(-100%)`;
			}
		};

		btnMenu.addEventListener('click', handlerMenu);
		menu.addEventListener('click', event => {
			const target = event.target;

			if (target.classList.contains('close-btn') || target.tagName === 'A') handlerMenu();
		});
	};

	toggleMenu();

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

	togglePopup();

	//Табы
	const tabs = () => {
		const
			tabHeader = document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

		const toggleTabContent = index => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			}
		};

		tabHeader.addEventListener('click', event => {
			let target = event.target;
			target = target.closest('.service-header-tab');

			if (target) {
				tab.forEach((item, i) => {
					if (item === target) {
						toggleTabContent(i);
					}
				});
			}
		});
	};

	tabs();

});

const countTimer = deadline => {
	const
		timerHours = document.querySelector('#timer-hours'),
		timerMinutes = document.querySelector('#timer-minutes'),
		timerSeconds = document.querySelector('#timer-seconds');

	//Вычисляем время
	const getTimeRemaining = () => {
		const
			dateStop = new Date(deadline).getTime(),
			dateNow = new Date().getTime(),
			timerRemaining = (dateStop - dateNow) / 1000,
			seconds = Math.floor(timerRemaining % 60),
			minutes = Math.floor((timerRemaining / 60) % 60),
			hours = Math.floor(timerRemaining / 60 / 60);

		return {
			hours,
			minutes,
			seconds,
			timerRemaining
		};
	};

	//Выводим на страницу
	const updateClock = () => {
		const timer = getTimeRemaining();

		if (timer.timerRemaining === 0 || timer.timerRemaining < 0) {
			// eslint-disable-next-line no-use-before-define
			clearInterval(idInterval);
			timerHours.textContent = '00';
			timerMinutes.textContent = '00';
			timerSeconds.textContent = '00';
		} else {
			timerHours.textContent = timer.hours < 10 ? `0${timer.hours}` : timer.hours;
			timerMinutes.textContent = timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes;
			timerSeconds.textContent = timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds;
		}
	};

	const idInterval = setInterval(updateClock, 1000);
};

countTimer('30 december 2020');
