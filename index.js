'use strict';

// Обьявляем переменные
let money,
    income = 'кухня',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
        'Квартплата, проездной, кредит')
        .toLowerCase().split(', '),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 100000,
    period = 6,
    expenses1,
    expenses2,
    start = getStart(),
    expensesAmount = getExpensesMonth(),
    accumulatedMonth = getAccumulatedMonth(),
    budgetDay = Math.floor(accumulatedMonth / 30);


// Функционал

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function getStart() {
    money = prompt('Ваш месячный доход?');

    do {
        money = prompt('Ваш месячный доход?');
    }
    while (!isNumber(money));
}

function getExpensesMonth() {
    let sum = 0;
    
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            expenses1 = prompt('Введите обязательную статью расходов', 'машина')
        } else if (i === 1) {
            expenses2 = prompt('Введите обязательную статью расходов', 'сигареты')
        }

        sum = prompt('Во сколько это обойдется?');

        while (!isNumber(sum)) {
            sum += prompt('Во сколько это обойдется?')
        }
    }

    return sum;
}

function getAccumulatedMonth() {
    return money - expensesAmount;
}

function getTargetMonth() {
    return Math.ceil(mission / accumulatedMonth);
}

function getStatusIncome() {
    if (budgetDay > 1200) {
        return ('У вас высокий уровень дохода');
    } else if (budgetDay >= 600 && budgetDay <= 1200) {
        return ('У вас средний уровень дохода');
    } else if (budgetDay < 600 && budgetDay > 0) {
        return ('К сожалению у вас уровень дохода ниже среднего')
    } else {
        return ('Что то пошло не так')
    }
}

function showTypeOf(data) {
    return typeof data;
}

if (getTargetMonth() > 0) {
    console.log('Цель будет достигнута за: ' + getTargetMonth() + ' месяцев');
} else {
    console.log('Цель не будет достигнута');
}

// Выводы в консоль
console.log(showTypeOf(money));
console.log(showTypeOf(income));
console.log(showTypeOf(deposit));
console.log('Цель заработать ' + mission + ' рублей');
console.log('Период равен ' + period + ' месяцев');
console.log(addExpenses);
console.log('Расходы за месяц: ' + expensesAmount);
console.log('Бюджет на день ' + budgetDay);
console.log(getStatusIncome());