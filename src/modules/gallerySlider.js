const gallerySlider = () => {
	const
		sliderContainer = document.querySelector('.gallery-slider'),
		slide = sliderContainer.children;

	// Добавим всем слайдам кроме первого display: none;
	for (let i = 0; i < slide.length; i++) {
		if (i !== 0) {
			slide[i].style.display = 'none';
		}
	}

	//Добавим кнопки, чтобы управлять слайдером
	const
		prevBtn = document.createElement('button'),
		nextBtn = document.createElement('button');

	prevBtn.className = 'slider__prev';
	nextBtn.className = 'slider__next';
	sliderContainer.append(prevBtn);
	sliderContainer.append(nextBtn);
	sliderContainer.style.position = 'relative';

	let currentSlide = 0, //Текущий слайд
		interval; //Интервал для setInterval

	const prevSlide = (elem, index) => {
		elem[index].style.display = 'none';

	};

	const nextSlide = (elem, index) => {
		elem[index].style.display = 'block';
	};


	sliderContainer.addEventListener('click', event => {
		const target = event.target;

		event.preventDefault();

		if (!target.matches('.slider__prev, .slider__next')) return;

		prevSlide(slide, currentSlide);
		// prevSlide(dot, currentSlide, 'dot-active');

		if (target.matches('.slider__next')) {
			currentSlide++;
		} else if (target.matches('.slider__prev')) {
			currentSlide--;
		} else if (target.matches('.dot')) {
			// dot.forEach((elem, index) => {
			// 	if (elem === target) currentSlide = index;
			// });
		}

		if (currentSlide >= slide.length) currentSlide = 0;
		if (currentSlide < 0) currentSlide = slide.length - 1;

		nextSlide(slide, currentSlide);
		// nextSlide(dot, currentSlide, 'dot-active');
	});
	// sliderContainer.addEventListener('mouseover', event => {
	// 	if (event.target.matches('.portfolio-btn') ||
	// 		event.target.matches('.dot')) stopSlide();
	// });
	// sliderContainer.addEventListener('mouseout', event => {
	// 	if (event.target.matches('.portfolio-btn') ||
	// 		event.target.matches('.dot')) startSlide();
	// });

};

export default gallerySlider;
