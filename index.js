'use strict';


let counter = 10;

function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

function guessNumber(count) {
    let userNum = prompt('Угадай число от 1 до 100'),
        currentNum = 10;

        counter--;

    function compareNumber(userNumber) {
        if (counter > 0) {
            if (isNumber(userNum)) {
                if (userNumber > currentNum) {
                    alert('Загаданное число меньше. У вас осталось ' + counter + ' попыток', 'введите новый вариант');
                    guessNumber();
                } else if (userNumber < currentNum) {
                    alert('Загаданное число больше. У вас осталось ' + counter + ' попыток', 'введите новый вариант');
                    guessNumber();
                } else if (userNumber == currentNum) {
                    alert('Поздравляю, Вы угадали!!!');
                    guessNumber(counter = 10);
                }
            } else if (userNum === null) {
                return alert('Игра окончена!');
            } else {
                alert('Введи число!');
                guessNumber();
            }
        } else {
            confirm('Попытки закончились, хотите сыграть еще?') ?
                guessNumber(counter = 10) :
                alert('Игра окончена!');
        }
    }
    return compareNumber(userNum);
}

guessNumber(counter);


