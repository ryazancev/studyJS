import animate from './animate';

const calc = () => {
	animate({
		duration: 1000,
		timing(timeFraction) {
			return timeFraction;
		},
		draw(progress) {
			// elem.style.width = progress * 100 + '%';
		}
	});
};

export default calc;