'use strict';

// Обьявляем переменные
let money,
    start = getStart(),
    appData = {
        income: {},
        addIncome: [],
        expenses: {},
        addExpenses: [],
        budget: money,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        deposit: false,
        mission: 100000,
        period: 6,
        asking: function() {
            // console.log(appData.budget);
            let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
            'Квартплата, проездной, кредит');
                appData.addExpenses = addExpenses.toLowerCase().split(', ');
                appData.deposit = confirm('Есть ли у вас депозит в банке?');
            
            for (let i = 0; i < 2; i++) {
                appData.expenses[prompt('Введите обязательную статью расходов')] = +prompt('Во сколько это обойдется?');
            }
        },
        getExpensesMonth: function() {
            for(let key in appData.expenses) {
                appData.expensesMonth += appData.expenses[key];
            }
        },
        getBudget: function() {
            console.log(appData.budget);
            appData.budgetMonth = appData.budget - appData.expensesMonth;
            appData.budgetDay = appData.budgetMonth / 30;
        },
        getTargetMonth: function() {
            
            if ((appData.mission / appData.budgetDay) > 0) {
                return ('Цель будет достигнута за: ' + Math.ceil(appData.mission / appData.budgetDay) + ' месяцев');
            } else {
                return ('Цель не будет достигнута');
            }
        },
        getStatusIncome: function() {
            if (appData.budgetDay > 1200) {
                return ('У вас высокий уровень дохода');
            } else if (appData.budgetDay >= 600 && appData.budgetDay <= 1200) {
                return ('У вас средний уровень дохода');
            } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
                return ('К сожалению у вас уровень дохода ниже среднего')
            } else {
                return ('Что то пошло не так')
            }
        }
    };
    
    
    
    
// Функционал

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function getStart() {
    do {
        money = +prompt('Ваш месячный доход?');
    }
    while (!isNumber(money));
}


appData.asking();
appData.getExpensesMonth();
appData.getBudget();


// Выводы в консоль
console.log('Расходы за месяц: ' + appData.budgetMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

// for(let key in appData) {
//     console.log('Наша программа включает в себя данные: ' + key + ' ' + ' ' + appData[key]);
// }

