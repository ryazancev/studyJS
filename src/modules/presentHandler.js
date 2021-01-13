const presentHandler = () => {
	// Получаем элементы со страницы
	const
		present = document.querySelector('.fixed-gift'),
		popup = document.getElementById('gift');

	present.addEventListener('click', () => {
		popup.style.display = 'block';
		present.style.display = 'none';
	});

	popup.addEventListener('click', event => {
		let target = event.target;

		if (target.classList.contains('close_icon') || target.classList.contains('close-btn')) {
			popup.style.display = '';
		} else {
			target = target.closest('.form-content');

			if (!target) popup.style.display = '';
		}
	});
};

export default presentHandler;
