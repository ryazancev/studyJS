'use strict';

// Обьявляем переменные
const calculateButton = document.getElementById('start'),
        incomeAdd = document.getElementsByTagName('button')[0],
        expensesAdd = document.getElementsByTagName('button')[1],
        depositCheck = document.querySelector('#deposit-check'),
        additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
        budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
        budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
        expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
        additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
        additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
        incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
        targetMonthValue = document.getElementsByClassName('target_month-value')[0],
        salaryAmount = document.querySelectorAll('.salary-amount'),
        incomeTitle = document.querySelectorAll('.income-title'),
        incomeAmount = document.querySelectorAll('.income-amount'),
        expensesTitle = document.querySelectorAll('.expenses-title'),
        expensesAmount = document.querySelectorAll('.expenses-amount'),
        additionalExpensesItem = document.querySelectorAll('.additional_expenses-item'),
        targetAmount = document.querySelectorAll('.target-amount'),
        periodSelect = document.querySelectorAll('.period-select');

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
        persentDeposit: 0,
        moneyDeposit: 0,
        mission: 100000,
        period: 6,
        asking: function() {
            if (confirm('Есть ли у вас дополнительный заработок?')) {
                let itemIncome,
                    cashIncome;

                    do {
                        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Курьер');
                    }
                    while (isNumber(itemIncome));

                    do {
                        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете', 10000);
                    }
                    while (!isNumber(cashIncome));

                    appData.income[itemIncome] = cashIncome;
            }
            let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
                'Квартплата, проездной, кредит');
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

            for (let i = 0; i < 2; i++) {
                let question,
                    answer;
                
                do {
                    question = prompt('Введите обязательную статью расходов');
                }
                while (isNumber(question))

                do {
                    answer = prompt('Во сколько это обойдется?')
                }
                while (!isNumber(answer))

                appData.expenses[question] = +answer;
            } 
        },
        getExpensesMonth: function() {
            for (let key in appData.expenses) {
                appData.expensesMonth += appData.expenses[key];
            } 
        },
        getBudget: function() {
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
        },
        getInfoDeposit: function() {
            if (appData.deposit) {
                do {
                    appData.persentDeposit = prompt('Какой годовой процент?', '10');
                }
                while (!isNumber(appData.persentDeposit))
                
                do {
                    appData.moneyDeposit = prompt('Какая сумма заложена', 10000);
                }
                while (!isNumber(appData.moneyDeposit))
            }
        },
        calcSavedMoney: function() {
            return appData.budgetMonth * appData.period;
        }
    };

// Функционал

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function getStart() {
    do {
        money = prompt('Ваш месячный доход?');
    }
    while (!isNumber(money));
    
    money = +money;
}

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getInfoDeposit();

for (let key in appData) {
    console.log('Наша программа включает в себя данные: ');
    console.log(key + ' ' + ' ' + appData[key]);
}

// Выводы в консоль
console.log('Расходы за месяц: ' + appData.budgetMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log(appData.addExpenses.map(function(item) {
    return item[0].toUpperCase() + item.slice(1);
}).join(', '));