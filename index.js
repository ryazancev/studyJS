// Создать массив week и записать в него дни недели в виде строк
let week = ['вск', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

// ·        Вывести на экран все дни недели
document.write(week);
document.write('<br>');

// ·        Каждый из них с новой строчки
week.forEach(function(item) {
    document.write(item, '<br>');
});

// ·        Выходные дни - курсивом
document.write('<i>', week[0], '\n', week[6], '</i>');
document.write('<br>');

// ·        Текущий день - жирным шрифтом(использовать объект даты)
let date = new Date(),
    weekday = date.getDay();
    
    if (weekday === 0 || weekday === 6) {
        document.write('<b>', '<i>', week[weekday], '</i>', '</b>');
        document.write('<br>');
    } else {
        document.write('<b>', week[weekday], '</b>');
        document.write('<br>');
    }




