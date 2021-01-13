import Carousel from './carousel';

const servicesSlider = () => {
	const carousel = new Carousel({
		main: '.services__wrapper',
		wrap: '.services-slider',
		slidesToShow: 5,
		responsive: [
			{
				breackpoint: 991,
				slidesToShow: 3
			},
			{
				breackpoint: 767,
				slidesToShow: 2
			},
			{
				breackpoint: 580,
				slidesToShow: 1
			}
		]
	});

	carousel.init();
};

export default servicesSlider;
