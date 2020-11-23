let money = 30000; 
let income = 'кухня'; 
let addExpenses = 'арнеда, интернет, такси, автобус, еда'; 
let deposit = true; 
let mission = 100000; 
let period = 6;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log('Цель заработать ' + mission + ' рублей');
console.log('Период равен ' + period + ' месяцев');

addExpenses = addExpenses.toLowerCase().split(', ');
console.log(addExpenses);

let budgetDay = money / 30;
// console.log('Бюджет на день ' + budgetDay);

// Задание 3

// 2 Спрашиваем у пользователя “Ваш месячный доход?” и результат сохраняем в переменную money
money = +prompt('Ваш месячный доход?');

/* 3 Спросить у пользователя “Перечислите возможные расходы 
за рассчитываемый период через запятую” сохранить в переменную addExpenses */
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
'пример: Квартплата, проездной, кредит')
.toLowerCase().split(', ');

// 4 Спросить у пользователя “Есть ли у вас депозит в банке?” и сохранить данные в переменной deposit
deposit = confirm('Есть ли у вас депозит в банке?');

// 5 Спросить у пользователя по 2 раза каждый вопрос и записать ответы в разные переменные 
let expenses1 = prompt('Введите обязательную статью расходов');
let expenses2 = prompt('Введите обязательную статью расходов');
let amount1 = +prompt('Во сколько ' + expenses1 + ' обойдется');
let amount2 = +prompt('Во сколько ' + expenses2 + ' обойдется');

/* 6 Вычислить бюджет на месяц, учитывая обязательные расходы, 
сохранить в новую переменную budgetMonth и вывести результат в консоль*/
let budgetMonth = money - (amount1 + amount2);
console.log('Бюджет на месяц ' + budgetMonth);

/*7 Зная budgetMonth, посчитать за сколько месяцев будет достигнута цель mission, 
вывести в консоль */
let countMonth = Math.ceil(mission / budgetMonth);
console.log('Цель будет достигнута за: ' + countMonth + ' месяцев');

// 8 Поправить budgetDay учитывая бюджет на месяц, а не месячный доход. Вывести в консоль 
budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день ' + budgetDay);

// 9 Написать конструкцию условий 
if (budgetDay > 1200) {
    alert('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay <= 1200) {
    alert('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay > 0) {
    alert('К сожалению у вас уровень дохода ниже среднего')
} else {
    alert('Что то пошло не так')
}