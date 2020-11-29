'use strict';

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function guessNumber() {
    const currentNumber = getRandom(1, 100);
    const counterNumber = 10;

    function compareNumber(counter) {
        let userNumber = prompt('Угадай число от 1 до 100');
        counter--
        if (counter > 0) {            
            if (isNumber(userNumber)) {
                if (userNumber > currentNumber) {
                    alert('Загаданное число меньше. У вас осталось ' + counter + 
                    ' попыток', 'введите новый вариант');
                    compareNumber(counter);
                } else if (userNumber < currentNumber) {
                    alert('Загаданное число больше. У вас осталось ' + counter + 
                    ' попыток', 'введите новый вариант');
                    compareNumber(counter);
                } else if (userNumber == currentNumber) {
                    alert('Поздравляю, Вы угадали!!!');
                    return;
                }
            } else if (userNumber === null) {
                return alert('Игра окончена!');
            } else {
                alert('Введи число!');
                compareNumber(counter);
            }
        } else {
            confirm('Попытки закончились, хотите сыграть еще?') ? 
            guessNumber() : 
            alert('Игра окончена!');
        }
    }
    compareNumber(counterNumber);
}

guessNumber();