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
    budgetMonth = money - (amount1 + amount2),
    countMonth = Math.ceil(mission / budgetMonth),
    budgetDay = Math.floor(budgetMonth / 30);

// Функционал
if (budgetDay > 1200) {
    alert('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay <= 1200) {
    alert('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay > 0) {
    alert('К сожалению у вас уровень дохода ниже среднего')
} else {
    alert('Что то пошло не так')
}

// Выводы в консоль
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log('Цель заработать ' + mission + ' рублей');
console.log('Период равен ' + period + ' месяцев');
console.log(addExpenses);
console.log('Бюджет на месяц ' + budgetMonth);
console.log('Цель будет достигнута за: ' + countMonth + ' месяцев');
console.log('Бюджет на день ' + budgetDay);