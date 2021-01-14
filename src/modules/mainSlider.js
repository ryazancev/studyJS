// Главный Слайдер
const mainSlider = () => {
	const
		sliderContainer = document.querySelector('.main-slider'),
		slide = sliderContainer.querySelectorAll('.slide');

	let currentSlide = 0, //Текущий слайд
		interval; //Интервал для setInterval

	const prevSlide = (elem, index) => {
		elem[index].style.display = 'none';
	};

	const nextSlide = (elem, index) => {
		elem[index].style.display = 'flex';
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

	startSlide();
};

export default mainSlider;
