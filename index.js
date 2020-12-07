const body = document.body,
    div1 = document.createElement('div'),
    div2 = document.createElement('div');

    body.insertAdjacentElement('afterbegin', div2);
    body.insertAdjacentElement('afterbegin', div1);

setInterval(function() {
    const 
        date = new Date(),
        days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        month = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
        weekday = date.getDay(),
        monthNumber = date.getMonth(),
        today = date.getUTCDate(),
        year = date.getUTCFullYear(),
        hour = date.getHours(), 
        minutes = date.getUTCMinutes(),
        seconds = date.getUTCSeconds(),
        currentDate = date.toLocaleDateString(),
        currentTime = date.toLocaleTimeString();

    const time = function(hour, minutes, seconds) {
        let timeStr;

        hour = hour < 10 ? '0' + hour : hour;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        if (hour === 01 || hour === 21) {
            hour += ' час';
        } else if (hour > 01 && hour < 05 || hour > 21 && hour <= 23) {
            hour += ' часа';
        } else if (hour > 04 && hour < 21) {
            hour += ' часов';
        }

        if (minutes < 01 || minutes > 4 && minutes < 21 || 
            minutes > 24 && minutes < 31 || minutes > 34 && minutes < 41 ||
            minutes > 44 && minutes < 51 || minutes > 54) {
                minutes += ' минут';
        } else if (minutes < 02 || minutes === 21 || minutes === 31 || minutes === 41 || minutes === 51) {
            minutes += ' минута';
        } else {
            minutes += ' минуты';
        }

        if (seconds < 01 || seconds > 4 && seconds < 21 || 
            seconds > 24 && seconds < 31 || seconds > 34 && seconds < 41 || 
            seconds > 44 && seconds < 51 || seconds > 54) {
                seconds += ' секунд';
        } else if (seconds < 02 || seconds === 21 || seconds === 31 || seconds === 41 || seconds === 51) {
            seconds += ' секунда';
        } else {
            seconds += ' секунды';
        }

        return timeStr = hour + ' ' + minutes + ' ' + seconds;
    };

        div1.textContent = 'Сегодня ' + days[weekday] + ', ' + today + ' ' + month[monthNumber] + ' ' 
        + year + ' года, ' +  time(hour, minutes, seconds);
        div2.textContent = currentDate + ' - ' + currentTime;
        
}, 1000);




