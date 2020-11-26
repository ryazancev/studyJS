'use strict';


function guessNumber() {
    let userNum = prompt('Угадай число от 1 до 100'),
        currentNum = 10;
    
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function compareNumber(userNumber) {
        if (isNumber(userNum)) {
            if (userNumber > currentNum) {
                alert('Загаданное число меньше, введите новый вариант');
                guessNumber();
            } else if (userNumber < currentNum) {
                alert('Загаданное число больше, введите новый вариант');
                guessNumber();
            } else if (userNumber == currentNum) {
                return alert('Поздравляю, Вы угадали!!!');
            }
        } else if (userNum === null) {
            return alert('Игра окончена!');
        } else {
            alert('Введи число!');
            guessNumber();
        }
    }
    return compareNumber(userNum);
}

guessNumber();


