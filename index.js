'use strict';

window.addEventListener('DOMContentLoaded', () => {

	//Timer
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
	countTimer('15 december 2020');

	//Меню
	const toggleMenu = () => {
		const
			btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu'),
			closeBtn = document.querySelector('.close-btn'),
			menuItems = menu.querySelectorAll('ul>li');

		const handlerMenu = () => {
			if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
				menu.style.transform = `translate(0)`;
			} else {
				menu.style.transform = `translate(-100%)`;
			}
		};

		btnMenu.addEventListener('click', handlerMenu);
		closeBtn.addEventListener('click', handlerMenu);
		menuItems.forEach(item => {
			item.addEventListener('click', handlerMenu);
		});
	};
	toggleMenu();

	//Popup
	const togglePopup = () => {
		const
			popup = document.querySelector('.popup'),
			popupContent = popup.querySelector('.popup-content'),
			popupBtns = document.querySelectorAll('.popup-btn'),
			popupClose = document.querySelector('.popup-close');

		let count = 0,
			animate = false,
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

		popupClose.addEventListener('click', () => {
			popup.style.display = '';
		});

	};
	togglePopup();

});
