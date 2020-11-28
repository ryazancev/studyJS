// Создать массив week и записать в него дни недели в виде строк
let week = ['вск', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
    date = new Date(),
    weekday = date.getDay();

for (let i = 0; i < week.length; i++) {
    if (i === weekday) {
        if (week[i] === 'сб' || week[i] === 'вск') {
            document.write('<b>', '<i>', week[i], '</i>', '</b>');
        }
    } else if (week[i] === 'вск' || week[i] === 'сб' ) {
        document.write('<i>', week[i], '</i>', '<br>');
    } else {
        document.write(week[i], '<br>');
    }
}




