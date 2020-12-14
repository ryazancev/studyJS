'use strict';

function untilNewYear(newYear) {
	const
		days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
		body = document.body,
		greatingElem = document.createElement('div'),
		todayElem = document.createElement('div'),
		currentTimeElem = document.createElement('div'),
		untilDateElem = document.createElement('div');


	body.insertAdjacentElement('afterbegin', untilDateElem);
	body.insertAdjacentElement('afterbegin', currentTimeElem);
	body.insertAdjacentElement('afterbegin', todayElem);
	body.insertAdjacentElement('afterbegin', greatingElem);

	function getTime() {
		const
			date = new Date(),
			weekday = date.getDay(),
			currentTime = date.toLocaleTimeString('en'),
			dateStop = new Date(newYear).getTime(),
			dateNow = new Date().getTime(),
			timerRemaining = (dateStop - dateNow) / 1000,
			hour = date.getHours(),
			day = Math.floor(timerRemaining / 60 / 60 / 24);

		return {
			day,
			weekday,
			currentTime,
			hour
		};
	}

	function uploadPage() {
		const { day, weekday, currentTime, hour } = getTime();

		if (hour < 12 && hour > 6) {
			greatingElem.textContent = 'Доброе утро';
		} else if (hour > 12 && hour < 18) {
			greatingElem.textContent = 'Добрый день';
		} else if (hour > 18 && hour < 23) {
			greatingElem.textContent = 'Добрый вечер';
		} else {
			greatingElem.textContent = 'Доброй ночи';
		}

		todayElem.textContent = `Сегодня: ${days[weekday]}`;
		currentTimeElem.textContent = `Текущее время: ${currentTime}`;
		untilDateElem.textContent = `До нового года осталось ${day} дней`;

		setTimeout(uploadPage, 1000);
	}

	setTimeout(uploadPage, 1000);

}

untilNewYear('1 january 2021');
