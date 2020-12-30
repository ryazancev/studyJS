// send-ajax-form
const sendForm = () => {
	const
		errorMessage = 'Что-то пошло не так...',
		successMessage = 'Заявка отправлена';

	const forms = document.querySelectorAll('form');
	const statusMessage = document.createElement('div');
	statusMessage.style.color = '#ffffff';

	const postData = formData => fetch('./server.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: formData
	});

	forms.forEach(form => {
		form.addEventListener('input', () => {
			for (const elem of form.elements) {
				// eslint-disable-next-line no-undef
				if (elem.type === 'tel') maskPhone('.form-phone');
				if (elem.type === 'text' &&
					!elem.classList.contains('mess')) elem.value = elem.value.replace(/[^а-я ]/g, '');
				if (elem.classList.contains('mess')) elem.value = elem.value.replace(/[a-zA-z]+$/g, '');
			}
		});

		form.addEventListener('submit', event => {
			event.preventDefault();
			form.append(statusMessage);
			statusMessage.innerHTML = `<img src="./images/Spinner-1s-38px.svg">`;

			const formData = new FormData(form);

			postData(formData)
				.then(response => {
					if (response.status !== 200) throw new Error('status network not 200');
					statusMessage.textContent = successMessage;
					for (const elem of form.elements) {
						if (elem.tagName.toLocaleLowerCase() !== 'button' &&
								elem.type !== 'button') elem.value = '';
					}
				})
				.catch(error => {
					statusMessage.textContent = errorMessage;
					console.error(error);
				});
		});

		setTimeout(() => {
			statusMessage.remove();
		}, 10000);
	});
};

export default sendForm;
