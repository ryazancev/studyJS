import maskPhone from './maskPhone';


const sendForm = () => {
	// Получим все формы со страницы
	const forms = document.querySelectorAll('form');

	forms.forEach(form => {
		form.addEventListener('change', event => {
			event.preventDefault();
		});
	});

	
};

export default sendForm;
