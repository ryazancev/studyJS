import animate from './animate';

const calc = () => {
	const priceTotal = document.getElementById('price-total'),
		cardLetoMozaika = document.getElementById('card_leto_mozaika'),
		cardLetoSchelkovo = document.getElementById('card_leto_schelkovo'),
		cardOrder = document.getElementById('card_order'),
		priceMessage = document.querySelector('.price-message').children[0],
		m1 = document.getElementById('m1'),
		m2 = document.getElementById('m2'),
		m3 = document.getElementById('m3'),
		m4 = document.getElementById('m4');

	priceTotal.textContent = 1999;

	cardOrder.addEventListener('change', () => {
		animate({
			duration: 1000,
			timing(timeFraction) {
				return timeFraction;
			},
			draw(progress) {
				if (priceMessage.value !== '' && priceMessage.value === 'ТЕЛО2020') {
					console.log(priceMessage.value);
					if (cardLetoMozaika.checked) {
						if (m1.checked) priceTotal.textContent = Math.ceil(progress * (1999 - 1999 / 100 * 30));
						if (m2.checked) priceTotal.textContent = Math.ceil(progress * (9900 - 9900 / 100 * 30));
						if (m3.checked) priceTotal.textContent = Math.ceil(progress * (13900 - 13900 / 100 * 30));
						if (m4.checked) priceTotal.textContent = Math.ceil(progress * (19900 - 19900 / 100 * 30));
					} else if (cardLetoSchelkovo.checked) {
						if (m1.checked) priceTotal.textContent = Math.ceil(progress * (2999 - 2999 / 100 * 30));
						if (m2.checked) priceTotal.textContent = Math.ceil(progress * (14990 - 14990 / 100 * 30));
						if (m3.checked) priceTotal.textContent = Math.ceil(progress * (21990 - 21990 / 100 * 30));
						if (m4.checked) priceTotal.textContent = Math.ceil(progress * (24990 - 24990 / 100 * 30));
					}
				} else {
					if (cardLetoMozaika.checked) {
						if (m1.checked) priceTotal.textContent = Math.ceil(progress * 1999);
						if (m2.checked) priceTotal.textContent = Math.ceil(progress * 9900);
						if (m3.checked) priceTotal.textContent = Math.ceil(progress * 13900);
						if (m4.checked) priceTotal.textContent = Math.ceil(progress * 19900);
					} else if (cardLetoSchelkovo.checked) {
						if (m1.checked) priceTotal.textContent = Math.ceil(progress * 2999);
						if (m2.checked) priceTotal.textContent = Math.ceil(progress * 14990);
						if (m3.checked) priceTotal.textContent = Math.ceil(progress * 21990);
						if (m4.checked) priceTotal.textContent = Math.ceil(progress * 24990);
					}
				}
			}
		});
	});
};

export default calc;


