const filterByType = (type, ...values) => values.filter(value => typeof value === type), 
// Объявляем функцию, которая принимает параметр type и массив (rest параметр)
// Фильтруем этот массив. Колбэк ф-ция вернет нам элементы, которые по типу строго равняются типу, который мы передаем в ф-цию filterByType

	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // Создаем массив из псевдомассива (html коллекции)
		responseBlocksArray.forEach(block => block.style.display = 'none'); // Перебираем массив и каждому элементу задаем в стилях display none
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { // Объявляем ф-цию, которая принимает 3 параметра. Селектор блока, текст сообщения, селектор спана 
		hideAllResponseBlocks(); // вызываем ф-цию, которая скрывает элементы 
		document.querySelector(blockSelector).style.display = 'block'; // показываем элемент, который мы передаем в ф-цию как аргумент blockSelector
		if (spanSelector) { // Если мы передали spanSelector
			document.querySelector(spanSelector).textContent = msgText; // то задаем этому спану текст, который мы также передаем в ф-цию
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), 
	// объявляем ф-цию "showError", которая принимает парамтер "текст сообщения" и возвращает нам вызов ф-ии showResponseBlock

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	// объявляем ф-цию "showResults", которая принимает парамтер "текст сообщения" и возвращает нам вызов ф-ии showResponseBlock

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
	// объявляем ф-цию "showNoResults", которая возвращает нам вызов ф-ии showResponseBlock с 1 аргументом blockSelector

	tryFilterByType = (type, values) => { // Обявляем ф-цию tryFilterByType, которая принимает 2 параметра
		try { // Используем конструкцию try catch
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // Объявляем переменную, которой присваиваем, что нам вернет Метод eval(). 
			// Eval() выполняет JavaScript код, представленный строкой. В шаблонной строке мы вызываем ф-цию filterByType и передаем параметры тип, значение, которые мы преобразуем в строку
			const alertMsg = (valuesArray.length) ? // объявляем переменную alertMsg, которой присваиваем значение 
			// если у valuesArray есть length то присвоим в переменную строку `Данные с типом ${type}: ${valuesArray}`, если length нет то примвоим `Отсутствуют данные типа ${type}`;
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			showResults(alertMsg); // вызываем ф-цию showResults и передаем аргументом alertMsg; 
		} catch (e) { // если в блоке try возникнет ощибка то выполним код, который в блоке catch
			showError(`Ошибка: ${e}`); // блок catch принимает параметр е - ошибка и мы вызываем ф-цию showError, которая выведет нам эту ошибку на страницу
		}
	};

const filterButton = document.querySelector('#filter-btn'); //получаем со страницы кнопку на id

filterButton.addEventListener('click', e => { // вешаем обработчик события по клику
	const typeInput = document.querySelector('#type'); // получаем инпут с id type
	const dataInput = document.querySelector('#data'); // получаем инпут с id data

	if (dataInput.value === '') { // если поле dataInput пустое
		dataInput.setCustomValidity('Поле не должно быть пустым!'); // установим специальное сообщение
		showNoResults(); // вызываем ф-цию, которая покажет нам на странице элемент с классом .dialog__response-block_no-results
	} else { // если поле dataInput не пустое
		dataInput.setCustomValidity(''); // вернем специальное сообщение в дефолтный вид
		e.preventDefault(); // отменяем событие кнопки по умлочанию
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); 
		// вызываем ф-цию tryFilterByType. в которую передаем аргументы: знаечение поля typeInput без пробелов и значение dataInput без пробелов
	}
});

