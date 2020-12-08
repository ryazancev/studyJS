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
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');
    
let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');    

const checkInputNumber = function() {
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
};

const checkInputText = function() {
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
}; 

const check = function() {
    calculateButton.disabled = true;
    checkInputNumber();
    checkInputText();
    salaryAmount.addEventListener('keyup', function() {
        if (salaryAmount.value !== '') calculateButton.disabled = false;
    })
};

const AppData = function() {
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    this.deposit = false;
    this.persentDeposit = 0;
    this.moneyDeposit = 0;
};

AppData.prototype.start = function() {
    const allInputs = document.querySelectorAll('.data input[type="text"]');
    
    this.budget = +salaryAmount.value;
    
    calculateButton.style.display = 'none';
    resetButton.style.display = 'inline-block';
    expensesAdd.disabled = true;
    incomeAdd.disabled = true;

    allInputs.forEach(function(item) {
        item.disabled = true;
    });
    
    this.getExpenses();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getIncome();
    this.getIncomeMonth();
    this.getBudget();
    this.showResult();
};

AppData.prototype.reset = function() {
    const allInputs = document.querySelectorAll('.data input[type="text"]');

    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    
    calculateButton.style.display = 'inline-block';
    resetButton.style.display = 'none';
    expensesAdd.disabled = false;
    incomeAdd.disabled = false;

    allInputs.forEach(function(item) {
        item.disabled = false;
        item.value = '';
    });

    incomeItems.forEach(function(item, i) {
        item.querySelector('.income-title').disabled = false;
        item.querySelector('.income-amount').disabled = false;
        
        if (i > 0) {
            item.remove();
            incomeAdd.style.display = 'block';
        }
    });
    expensesItems.forEach(function(item, i) {
        item.querySelector('.expenses-title').disabled = false;
        item.querySelector('.expenses-amount').disabled = false;
        
        if (i > 0) {
            item.remove();
            expensesAdd.style.display = 'block';
        }
    });

    check();

    periodSelect.removeEventListener('input', this.range);
};

AppData.prototype.showResult = function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();

    periodSelect.addEventListener('input', this.range.bind(appData));
    
};

AppData.prototype.range = function() {
    incomePeriodValue.value = this.budgetMonth * periodSelect.value;;
};

AppData.prototype.addExpensesBlock = function() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';    
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesAdd.before(cloneExpensesItem);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
        expensesAdd.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function() {
    const _this = this;

    expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value,
            cashExpenses = item.querySelector('.expenses-amount').value;

            if (itemExpenses !== '' && cashExpenses !== '') {
                _this.expenses[itemExpenses] = +cashExpenses;
            }
    });
};

AppData.prototype.getIncome = function() {
    const _this = this;

    incomeItems.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value,
            cashIncome = item.querySelector('.income-amount').value;
            
            if (itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = +cashIncome;
            }
    })
};

AppData.prototype.addIncomeBlock = function() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    
    cloneIncomeItem.querySelector('.income-title').value = '';    
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeAdd.before(cloneIncomeItem);    
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
        incomeAdd.style.display = 'none';
    }
};

AppData.prototype.getAddExpenses = function() {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(', ');

    addExpenses.forEach(function(item) {
        item = item.trim();

        if (item !== '') {
            _this.addExpenses.push(item);
        }
    })
};

AppData.prototype.getAddIncome = function() {
    const _this = this;

    additionalIncomeItems.forEach(function(item) {
        let itemValue = item.value.trim();

        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }

    });
};

AppData.prototype.getExpensesMonth = function() {
    for (let key in appData.expenses) {
        this.expensesMonth += this.expenses[key];
    } 
};

AppData.prototype.getIncomeMonth = function() {
    for (let key in appData.income) {
        this.incomeMonth += this.income[key];
    } 
};

AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function() {
    if ((targetAmount.value / this.budgetDay) > 0) {
        return ('Цель будет достигнута за: ' + Math.ceil(targetAmount.value / this.budgetDay) + ' месяцев');
    } else {
        return ('Цель не будет достигнута');
    }
};

AppData.prototype.getStatusIncome = function() {
    if (this.budgetDay > 1200) {
        return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600 && this.budgetDay <= 1200) {
        return ('У вас средний уровень дохода');
    } else if (this.budgetDay < 600 && this.budgetDay > 0) {
        return ('К сожалению у вас уровень дохода ниже среднего')
    } else {
        return ('Что то пошло не так')
    }
};

AppData.prototype.getInfoDeposit = function() {
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
};

AppData.prototype.calcSavedMoney = function() {
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.eventsListeners = function() {
    calculateButton.addEventListener('click', this.start.bind(appData));
    resetButton.addEventListener('click', this.reset);
    expensesAdd.addEventListener('click', this.addExpensesBlock);
    incomeAdd.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('input', function() {
        periodAmount.textContent = periodSelect.value;
    });
};

const appData = new AppData();
appData.eventsListeners();
check();




// Выводы в консоль