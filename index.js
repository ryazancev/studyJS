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
        salaryAmount = document.querySelector('.salary-amount'),
        incomeTitle = document.querySelector('.income-title'),
        expensesTitle = document.querySelector('.expenses-title'),
        additionalExpensesItem = document.querySelector('.additional_expenses-item'),
        targetAmount = document.querySelector('.target-amount'),
        periodSelect = document.querySelector('.period-select'),
        periodAmount = document.querySelector('.period-amount');

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');        

let appData = {
        income: {},
        addIncome: [],
        expenses: {},
        addExpenses: [],
        budget: 0,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        incomeMonth: 0,
        deposit: false,
        persentDeposit: 0,
        moneyDeposit: 0,
        start: function() {
            appData.budget = +salaryAmount.value;

            appData.getExpenses();
            appData.getExpensesMonth();
            appData.getAddExpenses();
            appData.getAddIncome();
            appData.getIncomeMonth();
            appData.getBudget();
            appData.showResult();
            
        },
        showResult: function() {
            budgetMonthValue.value = appData.budgetMonth;
            budgetDayValue.value = appData.budgetDay;
            expensesMonthValue.value = appData.expensesMonth;
            additionalExpensesValue.value = appData.addExpenses.join(', ');
            additionalIncomeValue.value = appData.addIncome.join(', ');
            targetMonthValue.value = appData.getTargetMonth();
            incomePeriodValue.value = appData.calcSavedMoney();

            periodSelect.addEventListener('input', function() {
                incomePeriodValue.value = appData.calcSavedMoney();
            });
            
        },
        addExpensesBlock: function() {
            const cloneExpensesItem = expensesItems[0].cloneNode(true);
            
            expensesAdd.before(cloneExpensesItem);
            expensesItems = document.querySelectorAll('.expenses-items');

            if (expensesItems.length === 3) {
                expensesAdd.style.display = 'none';
            }
        },
        getExpenses: function() {
            expensesItems.forEach(function(item) {
                let itemExpenses = item.querySelector('.expenses-title').value,
                    cashExpenses = item.querySelector('.expenses-amount').value;

                    if (itemExpenses !== '' && cashExpenses !== '') {
                        appData.expenses[itemExpenses] = cashExpenses;
                    }
            });
        },
        getIncome: function() {
            incomeItems.forEach(function(item) {
                let itemIncome = item.querySelector('.income-title').value,
                    cashIncome = item.querySelector('.income-amount').value;

                    if (itemIncome !== '' && cashIncome !== '') {
                        appData.income[itemIncome] = +cashIncome;
                    }
            })
        },
        addIncomeBlock: function() {
            const cloneIncomeItem = incomeItems[0].cloneNode(true);
            
            incomeAdd.before(cloneIncomeItem);
            incomeItems = document.querySelectorAll('.income-items');        

            if (incomeItems.length === 3) {
                incomeAdd.style.display = 'none';
            }
        },
        getAddExpenses: function() {
            let addExpenses = additionalExpensesItem.value.split(', ');

            addExpenses.forEach(function(item) {
                item = item.trim();

                if (item !== '') {
                    appData.addExpenses.push(item);
                }
            })
        },
        getAddIncome: function() {
            additionalIncomeItems.forEach(function(item) {
                let itemValue = item.value.trim();

                if (itemValue !== '') {
                    appData.addIncome.push(itemValue);
                }

            });
        },
        getExpensesMonth: function() {
            for (let key in appData.expenses) {
                appData.expensesMonth += appData.expenses[key];
            } 
        },
        getIncomeMonth: function() {
            for (let key in appData.income) {
                appData.incomeMonth += appData.income[key];
            } 
        },
        getBudget: function() {
            appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
            appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
        },
        getTargetMonth: function() {
            if ((targetAmount.value / appData.budgetDay) > 0) {
                return ('Цель будет достигнута за: ' + Math.ceil(targetAmount.value / appData.budgetDay) + ' месяцев');
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
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

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
            return appData.budgetMonth * periodSelect.value;
        }   
    };

// Функционал

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

document.addEventListener('DOMContentLoaded', function() {
    calculateButton.disabled = true;

    salaryAmount.addEventListener('input', function() {
        if (salaryAmount.value !== '') calculateButton.disabled = false;
    })
});

calculateButton.addEventListener('click', appData.start);
expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function() {
    periodAmount.textContent = periodSelect.value;
});

// Выводы в консоль