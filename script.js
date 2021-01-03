'use strict';
const
	section = document.querySelector('.converter'),
	select = document.querySelector('.converter__select'),
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
			})
};

const calcUsd = () => {
	getResource(urlUsd)
			.then(data => {
				const rub = data.rates.RUB;
				outputRub.value = (inputVal.value * rub).toFixed(2);
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
				// сделать клик
			} 
			if (target.value === 'eur') {
				outputRub.value = '';
				inputVal.value = '';
				labelVal[0].textContent = 'Евро (EUR)';
			}
		})
	} else {
		target.addEventListener('change', () => {
			if (target.value === 'usd') {
				outputVal.value = '';
				inputRub.value = '';
				labelVal[1].textContent = 'Доллар США (USD)';
				
			} 
			if (target.value === 'eur') {
				outputVal.value = '';
				inputRub.value = '';
				labelVal[1].textContent = 'Евро (EUR)';
			}
		})
	}
})






