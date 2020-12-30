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

export default slider;
