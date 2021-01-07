import Carousel from './carousel';

const companiesCarousel = () => {
	const carousel = new Carousel({
		main: '.companies-wrapper',
		wrap: '.companies-hor',
		slidesToShow: 4,
		infinity: true,
		responsive: [
			{
				breackpoint: 1024,
				slidesToShow: 3
			},
			{
				breackpoint: 762,
				slidesToShow: 2
			},
			{
				breackpoint: 576,
				slidesToShow: 1
			}
		]
	});

	carousel.init();
};

export default companiesCarousel;
