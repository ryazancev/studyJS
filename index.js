const body = document.body,
    date = new Date(),
    div1 = document.createElement('div'),
    div2 = document.createElement('div'),
    days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    month = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
    weekday = date.getDate(),
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

    if (minutes === 00 || minutes > 4 && minutes < 21 || 
        minutes > 24 && minutes < 31 || minutes > 34 && minutes < 41 ||
        minutes > 54) {
            minutes += ' минут';
    } else if (minutes === 01 || minutes === 21 || minutes === 31 || minutes === 41 || minutes === 51) {
        minutes += ' минута';
    } else {
        minutes += ' минуты';
    }
    return timeStr = hour + ' ' + minutes + ' ' + seconds;
};



div1.textContent = 'Сегодня ' + days[weekday] + ', ' + today + ' ' + month[monthNumber] + ' ' 
+ year + ' года, ' +  time(hour, minutes, seconds);
div2.textContent = currentDate + ' - ' + currentTime;
body.insertAdjacentElement('afterbegin', div1);
body.insertAdjacentElement('afterbegin', div2);





// setInterval(function() {

// }, 1000)



