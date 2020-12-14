'use strict';

window.addEventListener('DOMContentLoaded', () => {

	//Timer
	function countTimer(deadline) {
		const
			timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');

		//Вычисляем время
		function getTimeRemaining() {
			const
				dateStop = new Date(deadline).getTime(),
				dateNow = new Date().getTime(),
				timerRemaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timerRemaining % 60),
				minutes = Math.floor((timerRemaining / 60) % 60),
				hours = Math.floor(timerRemaining / 60 / 60);

			return {
				hours,
				minutes,
				seconds,
				timerRemaining
			};
		}
		//Выводим на страницу

		const idInterval = setInterval(updateClock, 1000);

		function updateClock() {
			const timer = getTimeRemaining();

			if (timer.timerRemaining === 0 || timer.timerRemaining < 0) {
				clearInterval(idInterval);
				timerHours.textContent = '00';
				timerMinutes.textContent = '00';
				timerSeconds.textContent = '00';
			} else {
				timerHours.textContent = timer.hours < 10 ? `0${timer.hours}` : timer.hours;
				timerMinutes.textContent = timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes;
				timerSeconds.textContent = timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds;
			}

		}
	}

	countTimer('16 december 2020');

});
