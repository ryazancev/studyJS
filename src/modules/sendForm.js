import maskPhone from './maskPhone';


const sendForm = () => {
	// Получим все формы со страницы
	const forms = document.querySelectorAll('form'),
		errorMessage = 'Что-то пошло не так...',
		successMessage = 'Заявка отправлена',
		statusMessage = document.createElement('div'),
		popup = document.getElementById('thanks'),
		textMessage = popup.querySelector('p'),
		radioLetoMozaika = document.getElementById('footer_leto_mozaika'),
		radioLetoSchelkovo = document.getElementById('footer_leto_schelkovo');

	const postData = body => fetch('../../server.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});

	forms.forEach(form => {
		// Повесим на инпуты, маску и валидацию
		form.addEventListener('input', () => {
			// Выберем только те инпуты, которые нас интересуют
			for (const elem of form.elements) {
				if (elem.type === 'text') elem.value = elem.value.replace(/[^А-яа-я ]/, '');
				if (elem.type === 'tel') maskPhone('[type="tel"]');
			}
		});

		form.addEventListener('submit', event => {
			event.preventDefault();
			//Валидация
			statusMessage.style.color = '#f74104';
			statusMessage.style.marginTop = '5px';
			form.append(statusMessage);

			if (form.id !== 'footer_form') {
				for (const elem of form.elements) {
					if (elem.type === 'checkbox' && !elem.checked) {
						statusMessage.textContent = 'Вы должны дать согласие на обработку персональных данных';
						setTimeout(() => {
							statusMessage.textContent = '';
						}, 3000);
						return;
					} else {
						if (elem.type === 'text') {
							if (elem.value.length < 2 || elem.value.length > 50) {
								elem.value = '';
								statusMessage.textContent = 'Имя должно включать не менее 2 и не более 50 символов';
								setTimeout(() => {
									statusMessage.textContent = '';
								}, 3000);
								return;
							}
						}
					}
				}
			} else {
				if (!radioLetoMozaika.checked && !radioLetoSchelkovo.checked) {
					console.dir(radioLetoMozaika);
					console.dir(radioLetoSchelkovo);
					statusMessage.textContent = 'Вы должны выбрать клуб';
					setTimeout(() => {
						statusMessage.textContent = '';
					}, 3000);
					return;
				}

			}


			// Откроем модальное окно
			popup.style.display = 'block';
			// Добавим в модальное окно наше сообщение для пользователя
			// textMessage.innerHTML
		});
	});


};

export default sendForm;
