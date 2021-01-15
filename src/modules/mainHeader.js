const mainHeader = () => {
	const headerElem = document.querySelector('.header-main'),
		clubs = document.querySelector('.clubs-list').children[1],
		freeVisitForm = document.getElementById('free_visit_form'),
		callbackForm = document.getElementById('callback_form'),
		popUps = document.querySelectorAll('.popup');

	headerElem.addEventListener('click', event => {
		const target = event.target;

		if (target.closest('.clubs-list')) {
			if (!clubs.style.display) {
				clubs.style.display = 'block';
			} else {
				clubs.style.display = '';
			}
		}

		if (target.matches('.open-popup')) {
			freeVisitForm.style.display = 'block';
		} else if (target.matches('.callback-btn')) {
			callbackForm.style.display = 'block';
		}
	});

	popUps.forEach(item => {
		item.addEventListener('click', event => {
			let target = event.target;

			if (target.classList.contains('close_icon') || target.classList.contains('close-btn')) {
				item.style.display = '';
			} else {
				target = target.closest('.form-content');

				if (!target) item.style.display = '';
			}
		});
	});
};

export default mainHeader;
