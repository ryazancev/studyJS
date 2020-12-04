const body = document.body,
    date = new Date(),
    div = document.createElement('div'),
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

div.textContent = 'Сегодня ' + days[weekday] + ', ' + today + ' ' + month[monthNumber] + ' ' 
+ year + ' года, ' +  hour + ' час ' + minutes + ' минут ' + seconds + ' секунд';
body.insertAdjacentElement('afterbegin', div);



// setInterval(function() {

// }, 1000)



