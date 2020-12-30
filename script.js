'use strict';
fetch('https://api.exchangeratesapi.io/latest')
	.then(response => {
		if (response.status !== 200) {
			throw new Error('status neywork not 200')
		}
		return response.json();
	})
	.then(data => {
		console.log(data); //евро
	})
fetch('https://api.exchangeratesapi.io/latest?base=USD')
	.then(response => {
		if (response.status !== 200) {
			throw new Error('status neywork not 200')
		}
		return response.json();
	})
	.then(data => {
		console.log(data); //доллар
	})