
const gallerySlider = () => {
	try {
		const
			sliderContainer = document.querySelector('.gallery-slider'),
			slide = sliderContainer.querySelectorAll('.slide'),
			style = document.querySelector('style'),
			prevBtn = document.querySelector('.slider__prev').cloneNode(true),
			nextBtn = document.querySelector('.slider__next').cloneNode(true),
			pagination = document.createElement('ul');

		let currentSlide = 0; //Текущий слайд

		// Добавим всем слайдам кроме первого display: none;
		for (let i = 0; i < slide.length; i++) {
			if (i !== 0) {
				slide[i].style.display = 'none';
			}
		}

		// Установим relative чтобы разместить кнопки и пагинацию
		sliderContainer.style.position = 'relative';

		// Закинем кнопки из карусели в тело слайдера
		sliderContainer.append(prevBtn);
		sliderContainer.append(nextBtn);

		// создаем пагинацию
		pagination.className = 'pagination__list';
		sliderContainer.append(pagination);
		slide.forEach((item, i) => {
			const pagItem = document.createElement('li');
			pagItem.className = 'pagination__item';
			if (i === 0) pagItem.classList.add('pagination__item--active');
			pagination.append(pagItem);
		});

		// Кнопкам поменяем положение в пространсвте, пагинации добавим стилей
		style.insertAdjacentText('beforeend', `
		.gallery-slider .slider__prev,
		.gallery-slider .slider__next {
			top: 45%;
		}

		.gallery-slider .slider__prev {
			left: 40px;
		}

		.gallery-slider .slider__next {
			right: 40px;
		}

		.pagination__list {
			width: 200px;
			display: flex;
			justify-content: space-between;
			position: absolute;
			bottom: 20px;
			left: 39%;
		}

		.pagination__item {
			width: 20px;
			height: 10px;
			border: 2px solid white;
			cursor: pointer;
		}

		.pagination__item--active {
			background-color: #f4d11a;
		}

		@media (max-width: 580px) {
			.pagination__list {
				left: 32%;
			}
			.gallery-slider .slider__prev {
				left: 0px;
			}
	
			.gallery-slider .slider__next {
				right: 0px;
			}
		}

		@media (max-width: 390px) {
			.pagination__list {
				left: 23%;
			}
		}
	`);

		sliderContainer.addEventListener('click', event => {
			const target = event.target;
			const pagBlock = document.querySelectorAll('.pagination__item');

			if (!target.matches('.arrow, .slider__next, .slider__prev, .pagination__item')) return;

			slide[currentSlide].style.display = 'none';
			pagBlock[currentSlide].classList.remove('pagination__item--active');

			if (target.closest('.slider__next')) {
				currentSlide++;
			} else if (target.closest('.slider__prev')) {
				currentSlide--;
			} else if (target.matches('.pagination__item')) {
				pagBlock.forEach((elem, index) => {
					if (elem === target) currentSlide = index;
				});
			}

			if (currentSlide >= slide.length) currentSlide = 0;
			if (currentSlide < 0) currentSlide = slide.length - 1;

			slide[currentSlide].style.display = 'block';
			pagBlock[currentSlide].classList.add('pagination__item--active');
		});
	} catch (error) {
		console.warn(error);
	}

};

export default gallerySlider;
