'use strict';
const
	section = document.querySelector('.converter'),
	buttonToRub = document.getElementById('to-rub'),
	buttonToVal = document.getElementById('to-val'),
	inputVal = document.getElementById('input-val'),
	outputRub = document.getElementById('output-rub'),
	inputRub = document.getElementById('input-rub'),
	outputVal = document.getElementById('output-val'),
	labelVal = document.querySelectorAll('.label-val');

const
	urlEur = 'https://api.exchangeratesapi.io/latest',
	urlUsd = 'https://api.exchangeratesapi.io/latest?base=USD';

const getResource = async (url) => {

	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`)
	}

	return await response.json()

};

const calcEur = () => {
	getResource(urlEur)
			.then(data => {
				const rub = data.rates.RUB;
				outputRub.value = (inputVal.value * rub).toFixed(2);
				setTimeout(() => {
					inputVal.value = '';
				}, 3000)
			})
};

const calcUsd = () => {
	getResource(urlUsd)
			.then(data => {
				const rub = data.rates.RUB;
				outputRub.value = (inputVal.value * rub).toFixed(2);
				setTimeout(() => {
					inputVal.value = '';
				}, 3000)
			})
};

const calcRubToEur = () => {
	getResource(urlEur)
			.then(data => {
				const rub = data.rates.RUB;
				outputVal.value = (inputRub.value / rub).toFixed(2);
				setTimeout(() => {
					inputRub.value = '';
				}, 3000)
			})
};

const calcRubToUsd = () => {
	getResource(urlUsd)
			.then(data => {
				const rub = data.rates.RUB;
				outputVal.value = (inputRub.value / rub).toFixed(2);
				setTimeout(() => {
					inputRub.value = '';
				}, 3000)
			})
};

section.addEventListener('click', event => {
	const target = event.target;
	
	if (target.dataset.converter === 'to-rub') {
		target.addEventListener('change', () => {
			if (target.value === 'usd') {
				outputRub.value = '';
				inputVal.value = '';
				labelVal[0].textContent = 'Доллар США (USD)';
				buttonToRub.removeEventListener('click', calcEur);
				buttonToRub.addEventListener('click', calcUsd);
			} else if (target.value === 'eur') {
				outputRub.value = '';
				inputVal.value = '';
				labelVal[0].textContent = 'Евро (EUR)';
				buttonToRub.removeEventListener('click', calcUsd);
				buttonToRub.addEventListener('click', calcEur);
			} else {
				return
			}
		})
	} else {
		target.addEventListener('change', () => {
			if (target.value === 'usd') {
				outputVal.value = '';
				inputRub.value = '';
				labelVal[1].textContent = 'Доллар США (USD)';
				buttonToVal.removeEventListener('click', calcRubToEur);
				buttonToVal.addEventListener('click', calcRubToUsd);
			} else if (target.value === 'eur') {
				outputVal.value = '';
				inputRub.value = '';
				labelVal[1].textContent = 'Евро (EUR)';
				buttonToVal.removeEventListener('click', calcRubToUsd);
				buttonToVal.addEventListener('click', calcRubToEur);
			} else {
				return
			}
		})
	}
})






