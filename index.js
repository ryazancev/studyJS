// Обьявляем переменные
let money = +prompt('Ваш месячный доход?'),
    income = 'кухня',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
        'пример: Квартплата, проездной, кредит')
        .toLowerCase().split(', '),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 100000,
    period = 6,
    expenses1 = prompt('Введите обязательную статью расходов'),
    amount1 = +prompt('Во сколько ' + expenses1 + ' обойдется'),
    expenses2 = prompt('Введите обязательную статью расходов'),
    amount2 = +prompt('Во сколько ' + expenses2 + ' обойдется'),
    accumulatedMonth = getAccumulatedMonth(money, amount1, amount2),
    budgetDay = Math.floor(accumulatedMonth / 30);


// Функционал
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
    console.log(data, typeof (data));
}

function getExpensesMonth(a, b) {
    return a + b;
}

function getAccumulatedMonth(a, b, c) {
    return money - (amount1 + amount2);
}

function getTargetMonth(a, b) {
    return Math.ceil(a / b);
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
getExpensesMonth(amount1, amount2);

// Выводы в консоль
console.log('Цель заработать ' + mission + ' рублей');
console.log('Период равен ' + period + ' месяцев');
console.log(addExpenses);
console.log('Цель будет достигнута за: ' + getTargetMonth(mission, accumulatedMonth) + ' месяцев');
console.log('Бюджет на день ' + budgetDay);
console.log(getStatusIncome());