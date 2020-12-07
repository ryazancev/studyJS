'use strict';

// Обьявляем переменные
const 
    calculateButton = document.getElementById('start'),
    resetButton = document.getElementById('cancel'),
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
            this.budget = +salaryAmount.value;
            
            calculateButton.style.display = 'none';
            resetButton.style.display = 'inline-block';
            salaryAmount.disabled = true;
            additionalIncomeItems[0].disabled = true;
            additionalIncomeItems[1].disabled = true;
            additionalExpensesItem.disabled = true;
            targetAmount.disabled = true;
            periodSelect.disabled = true; 

            incomeItems.forEach(function(item) {
                item.querySelector('.income-title').disabled = true;
                item.querySelector('.income-amount').disabled = true;
            });
            expensesItems.forEach(function(item) {
                item.querySelector('.expenses-title').disabled = true;
                item.querySelector('.expenses-amount').disabled = true;
            });
            
            this.getExpenses();
            this.getExpensesMonth();
            this.getAddExpenses();
            this.getAddIncome();
            this.getIncome();
            this.getIncomeMonth();
            this.getBudget();
            this.showResult();
        },
        reset: function() {
            this.income = {};
            this.addIncome = [];
            this.expenses = {};
            this.addExpenses = [];
            this.budget = 0;
            this.budgetDay = 0;
            this.budgetMonth = 0;
            this.expensesMonth = 0;
            this.incomeMonth = 0;

            salaryAmount.value = '';
            salaryAmount.disabled = false;
            calculateButton.style.display = 'inline-block';
            resetButton.style.display = 'none';
            additionalIncomeItems[0].value = '';
            additionalIncomeItems[0].disabled = false;
            additionalIncomeItems[1].value = '';
            additionalIncomeItems[1].disabled = false;
            additionalExpensesItem.value = '';
            additionalExpensesItem.disabled = false;
            targetAmount.value = '';
            targetAmount.disabled = false;
            periodSelect.disabled = false; 
            budgetMonthValue.value = '';
            budgetDayValue.value = '';
            expensesMonthValue.value = '';
            additionalExpensesValue.value = '';
            additionalIncomeValue.value = '';
            targetMonthValue.value = '';
            incomePeriodValue.value = '';
            
            incomeItems.forEach(function(item, i) {
                item.querySelector('.income-title').disabled = false;
                item.querySelector('.income-amount').disabled = false;
                item.querySelector('.income-title').value = '';    
                item.querySelector('.income-amount').value = '';
                if (i > 0) {
                    item.remove();
                    incomeAdd.style.display = 'block';
                }
            });
            expensesItems.forEach(function(item, i) {
                item.querySelector('.expenses-title').disabled = false;
                item.querySelector('.expenses-amount').disabled = false;
                item.querySelector('.expenses-title').value = '';    
                item.querySelector('.expenses-amount').value = '';
                if (i > 0) {
                    item.remove();
                    expensesAdd.style.display = 'block';
                }
            });
        
            periodSelect.removeEventListener('input', appData.range);
        },
        showResult: function() {
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = this.budgetDay;
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            targetMonthValue.value = this.getTargetMonth();
            incomePeriodValue.value = this.calcSavedMoney();

            periodSelect.addEventListener('input', appData.range.bind(appData));
            
        },
        range: function() {
            incomePeriodValue.value = this.calcSavedMoney();
        },
        addExpensesBlock: function() {
            const cloneExpensesItem = expensesItems[0].cloneNode(true);
            cloneExpensesItem.querySelector('.expenses-title').value = '';    
            cloneExpensesItem.querySelector('.expenses-amount').value = '';
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
                        appData.expenses[itemExpenses] = +cashExpenses;
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
            
            cloneIncomeItem.querySelector('.income-title').value = '';    
            cloneIncomeItem.querySelector('.income-amount').value = '';
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
                this.expensesMonth += this.expenses[key];
            } 
        },
        getIncomeMonth: function() {
            for (let key in appData.income) {
                this.incomeMonth += this.income[key];
            } 
        },
        getBudget: function() {
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
            this.budgetDay = Math.ceil(this.budgetMonth / 30);
        },
        getTargetMonth: function() {
            if ((targetAmount.value / this.budgetDay) > 0) {
                return ('Цель будет достигнута за: ' + Math.ceil(targetAmount.value / this.budgetDay) + ' месяцев');
            } else {
                return ('Цель не будет достигнута');
            }
        },
        getStatusIncome: function() {
            if (this.budgetDay > 1200) {
                return ('У вас высокий уровень дохода');
            } else if (this.budgetDay >= 600 && this.budgetDay <= 1200) {
                return ('У вас средний уровень дохода');
            } else if (this.budgetDay < 600 && this.budgetDay > 0) {
                return ('К сожалению у вас уровень дохода ниже среднего')
            } else {
                return ('Что то пошло не так')
            }
        },
        getInfoDeposit: function() {
            this.deposit = confirm('Есть ли у вас депозит в банке?');

            if (appData.deposit) {
                do {
                    this.persentDeposit = prompt('Какой годовой процент?', '10');
                }
                while (!isNumber(appData.persentDeposit))
                
                do {
                    this.moneyDeposit = prompt('Какая сумма заложена', 10000);
                }
                while (!isNumber(this.moneyDeposit))
            }
        },
        calcSavedMoney: function() {
            return this.budgetMonth * periodSelect.value;
        },
    };

// Функционал

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function checkInputText() {
    const regExp = /^[а-яА-ЯёЁ]+$/,
        placeholders = document.querySelectorAll('[placeholder="Наименование"]');
    
    placeholders.forEach(function(item) {
        item.addEventListener('input', function() {
            if (!regExp.test(item.value) && item.value.trim() !== '') {
                item.value = '';
                alert('Используйте русский алфавит!');
                return
            };  
        });
    });
}


function checkInputNumber() {
    const regExp = /^[0-9]+$/,
        placeholders = document.querySelectorAll('[placeholder="Сумма"]');
    
    placeholders.forEach(function(item) {
        item.addEventListener('input', function() {
            if (!regExp.test(item.value) && item.value.trim() !== '') {
                item.value = '';
                alert('Введите цифры');
                return
            };  
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    calculateButton.disabled = true;
    checkInputNumber();
    checkInputText();
    salaryAmount.addEventListener('input', function() {
        if (salaryAmount.value !== '') calculateButton.disabled = false;
    })
});

calculateButton.addEventListener('click', appData.start.bind(appData));
resetButton.addEventListener('click', appData.reset.bind(appData));
expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function() {
    periodAmount.textContent = periodSelect.value;
});


// Выводы в консоль