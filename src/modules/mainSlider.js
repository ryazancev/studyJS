// Главный Слайдер
const mainSlider = () => {
	const
		sliderContainer = document.querySelector('.main-slider'),
		offerHead = sliderContainer.querySelectorAll('.offer-head'),
		slide = sliderContainer.querySelectorAll('.slide');

	let currentSlide = 0, //Текущий слайд
		interval; //Интервал для setInterval

	offerHead.forEach(item => {
		item.style.marginTop = 0;
	});

	const prevSlide = (elem, index) => {
		elem[index].style.display = 'none';
	};

	const nextSlide = (elem, index) => {
		elem[index].style.display = 'block';
	};

	const autoPlaySlide = () => {
		prevSlide(slide, currentSlide);

		currentSlide++;

		if (currentSlide >= slide.length) currentSlide = 0;

		nextSlide(slide, currentSlide);
	};

	const startSlide = (time = 2000) => {
		interval = setInterval(autoPlaySlide, time);
	};

	const stopSlide = () => {
		clearInterval(interval);
	};

	startSlide();
};

export default mainSlider;
