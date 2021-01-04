import maskPhone from './maskPhone';
// send-ajax-form
const sendForm = () => {
	const
		errorMessage = 'Что-то пошло не так...',
		successMessage = 'Заявка отправлена';

	const forms = document.querySelectorAll('form');
	const statusMessage = document.createElement('div');
	statusMessage.style.color = '#ffffff';

	const postData = body => fetch('./server.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});

	forms.forEach(form => {
		form.addEventListener('input', () => {
			for (const elem of form.elements) {
				// eslint-disable-next-line no-undef
				if (elem.type === 'text' && !elem.classList.contains('mess')) {
					elem.value = elem.value.replace(/[^А-яа-я ]/, '');
				}
				if (elem.type === 'email') {
					elem.required = true;
				}
				if (elem.type === 'tel') maskPhone('.form-phone');
				if (elem.classList.contains('mess')) elem.value = elem.value
					.replace(/[a-zA-z\[\]\/\\\{\}\(\)\*\+\^\$\|\#\$\%\@\&\№]/, '');
			}
		});

		form.addEventListener('submit', event => {
			event.preventDefault();
			for (const elem of form.elements) {
				if (elem.type === 'text') {
					if (elem.value.length < 2 || elem.value.length > 50) {
						elem.setCustomValidity('Имя должно содержать не менее 2 и не более 50 символов');
						return;
					}
				}

				if (elem.type === 'email') {
					const reg = /[a-zA-Z]{2,10}@[a-zA-Z]+\.[a-z]{2,4}/;
					if (!reg.test(elem.value)) {
						elem.setCustomValidity('Пожалуйста введите корректный email');
						return;
					}
				}
			}

			form.append(statusMessage);
			statusMessage.innerHTML = `<img src="./images/Spinner-1s-38px.svg">`;

			const formData = new FormData(form);
			const body = {};
			formData.forEach((value, key) => {
				body[key] = value;
			});

			postData(body)
				.then(response => {
					if (response.status !== 200) throw new Error('status network not 200');
					statusMessage.textContent = successMessage;
					setTimeout(() => {
						for (const elem of form.elements) {
							if (elem.tagName.toLocaleLowerCase() !== 'button' &&
									elem.type !== 'button') elem.value = '';
						}
						statusMessage.remove();
					}, 5000);
				})
				.catch(error => {
					statusMessage.textContent = errorMessage;
					console.error(error);
				});
		});
	});
};

export default sendForm;
