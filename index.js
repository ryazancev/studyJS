'use strict';

// Кол-во попыток пользователя должно быть ограничено: 10


// — если пользователь вводит правильное число, то бот выводит "Поздравляю, Вы угадали!!! Хотели бы сыграть еще?", при нажатии ОК игра перезапускается (снова 10 попыток и новое загаданное число)
// — если пользователь ввел не число, то выводит сообщение "Введи число!" и предлагает ввести новый вариант;
// — если пользователь нажимает "Отмена", то игра выводит прощальное сообщение и завершается.
// — если закончились попытки то программа сообщает: "Попытки закончились, хотите сыграть еще?"

let counter = 10;

function guessNumber(count) {
    let userNum = prompt('Угадай число от 1 до 100'),
        currentNum = 10;
        
        counter--;
    
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function compareNumber(userNumber) {
        
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
        } else if (counter === 0) {

        } else {
            alert('Введи число!');
            guessNumber();
        }
    }
    return compareNumber(userNum);
}

guessNumber(counter);


