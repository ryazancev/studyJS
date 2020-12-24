'use strict';

window.addEventListener('DOMContentLoaded', () => {
	// Анимация база
	function animate({ timing, draw, duration }) {

		const start = performance.now();

		requestAnimationFrame(function animate(time) {
			// timeFraction изменяется от 0 до 1
			let timeFraction = (time - start) / duration;
			if (timeFraction > 1) timeFraction = 1;

			// вычисление текущего состояния анимации
			const progress = timing(timeFraction);

			draw(progress); // отрисовать её

			if (timeFraction < 1) {
				requestAnimationFrame(animate);
			}

		});
	}

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
		updateClock();

		const idInterval = setInterval(updateClock, 1000);
	};

	countTimer('30 december 2020');

	//Меню
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

	//Слайдер
	const slider = () => {
		const
			slide = document.querySelectorAll('.portfolio-item'),
			dotsContainer = document.querySelector('.portfolio-dots'),
			sliderContainer = document.querySelector('.portfolio-content');

		let currentSlide = 0, //Текущий слайд
			interval; //Интервал для setInterval

		//Создаем пагинацию
		slide.forEach(() => {
			const dots = document.createElement('li');
			dots.classList.add('dot');
			dotsContainer.insertAdjacentElement('beforeend', dots);
		});

		const dot = document.querySelectorAll('.dot'); // Получаем точки со страницы

		const prevSlide = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};

		const nextSlide = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		const autoPlaySlide = () => {
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			currentSlide++;

			if (currentSlide >= slide.length) currentSlide = 0;

			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		};

		const startSlide = (time = 1500) => {
			interval = setInterval(autoPlaySlide, time);
		};

		const stopSlide = () => {
			clearInterval(interval);
		};

		startSlide();

		sliderContainer.addEventListener('click', event => {
			const target = event.target;

			event.preventDefault();

			if (!target.matches('.portfolio-btn, .dot')) return;

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			if (target.matches('#arrow-right')) {
				currentSlide++;
			} else if (target.matches('#arrow-left')) {
				currentSlide--;
			} else if (target.matches('.dot')) {
				dot.forEach((elem, index) => {
					if (elem === target) currentSlide = index;
				});
			}

			if (currentSlide >= slide.length) currentSlide = 0;
			if (currentSlide < 0) currentSlide = slide.length - 1;

			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		});
		sliderContainer.addEventListener('mouseover', event => {
			if (event.target.matches('.portfolio-btn') ||
				event.target.matches('.dot')) stopSlide();
		});
		sliderContainer.addEventListener('mouseout', event => {
			if (event.target.matches('.portfolio-btn') ||
				event.target.matches('.dot')) startSlide();
		});
	};

	slider();

	//Фотографии
	const changePhoto = () => {
		const commandPhotos = document.querySelectorAll('.command__photo');

		commandPhotos.forEach(element => {
			const srcDefault = element.src;
			element.addEventListener('mouseenter', () => {
				element.src = element.dataset.img;
			});
			element.addEventListener('mouseleave', () => {
				element.src = srcDefault;
			});
		});
	};

	changePhoto();

	//Калькулятор
	const calc = (price = 100) => {
		const
			calcBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector('.calc-type'),
			calcSquare = document.querySelector('.calc-square'),
			calcDay = document.querySelector('.calc-day'),
			calcCount = document.querySelector('.calc-count'),
			totalValue = document.getElementById('total');

		//Валидация
		const calculateValidation = () => {
			const
				calcInputs = calcBlock.querySelectorAll('[type="text"]');

			calcInputs.forEach(element => {
				element.addEventListener('input', () => {
					element.value = element.value.replace(/\D/g, '');
				});
			});
		};

		calculateValidation();

		const countSum = () => {
			const
				typeValue = calcType.options[calcType.selectedIndex].value,
				squareValue = +calcSquare.value;

			let total = 0,
				countValue = 1,
				dayValue = 1;

			if (calcCount.value > 1) {
				countValue += (calcCount.value - 1) / 10;
			}

			if (calcDay.value && calcDay.value < 5) {
				dayValue *= 2;
			} else if (calcDay.value && calcDay.value < 10) {
				dayValue *= 1.5;
			}

			if (typeValue && squareValue) {
				total = price * typeValue * squareValue * countValue * dayValue;
			}

			//Запускаем анимацию для totalValue
			animate({
				duration: 100,
				timing(timeFraction) {
					return timeFraction;
				},
				draw(progress) {
					totalValue.textContent = Math.floor(progress * total);
				}
			});
		};

		calcBlock.addEventListener('change', event => {
			const target = event.target;

			if (target.matches('select') || target.matches('input')) {
				countSum();
			}
		});
	};

	calc(100);

	// send-ajax-form
	const sendForm = () => {
		const
			errorMessage = 'Что-то пошло не так...',
			loadMessage = 'Загрузка...',
			successMessage = 'Заявка отправлена';

		const forms = document.querySelectorAll('form');
		const statusMessage = document.createElement('div');
		statusMessage.style.color = '#ffffff';

		const postData = (body, outputData, errorData) => {
			const request = new XMLHttpRequest();

			request.addEventListener('readystatechange', () => {
				if (request.readyState !== 4) return;

				if (request.status === 200) {
					outputData();
				} else {
					errorData(request.status);
				}
			});

			request.open('POST', './server.php');
			request.setRequestHeader('Content-Type', 'application/json');
			request.send(JSON.stringify(body));
		};

		forms.forEach(form => {
			form.addEventListener('input', () => {
				for (const elem of form.elements) {
					// eslint-disable-next-line no-undef
					if (elem.type === 'tel') maskPhone('.form-phone');
					if (elem.type === 'text' &&
						!elem.classList.contains('mess')) elem.value = elem.value.replace(/[^а-я ]/g, '');
					if (elem.classList.contains('mess')) elem.value = elem.value.replace(/[a-zA-z]+$/g, '');
				}
			});

			form.addEventListener('submit', event => {
				event.preventDefault();
				form.append(statusMessage);
				statusMessage.innerHTML = `<img src="./images/Spinner-1s-38px.svg">`;

				const formData = new FormData(form);
				const body = {};

				formData.forEach((value, key) => {
					body[key] = value;
				});

				postData(body, () => {
					statusMessage.textContent = successMessage;
				}, error => {
					statusMessage.textContent = errorMessage;
					console.error(error);
				});

				for (const elem of form.elements) {
					if (elem.tagName.toLocaleLowerCase() !== 'button' &&
						elem.type !== 'button') elem.value = '';
				}

				setTimeout(() => {
					statusMessage.remove();
				}, 4000);
			});
		});
	};

	sendForm();
});
