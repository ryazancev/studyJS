'use strict';

const
	urlEur = 'https://api.exchangeratesapi.io/latest',
	urlUsd = 'https://api.exchangeratesapi.io/latest?base=USD';

const getEur = url => {
	fetch(url)
		.then(response => {
			if (response.status !== 200) {
				throw new Error('status neywork not 200')
			}
			return response.json();
		})
		.then(data => {
			rub = data.rates.RUB;
			outputRub.value = Math.floor(+inputCurrency.value * rub);
		})
		.catch(err => console.warn(err));
};

const getUsd = url => {
	fetch(url)
	.then(response => {
		if (response.status !== 200) {
			throw new Error('status neywork not 200')
		}
		return response.json();
	})
	.then(data => {
		console.log(data); //доллар
	})
};




