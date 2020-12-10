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
    periodAmount = document.querySelector('.period-amount'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');
    
let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');    

const checkInputNumber = () => {
    const regExp = /^[0-9]+$/,
        placeholders = document.querySelectorAll('[placeholder="Сумма"]');
    
    placeholders.forEach((item) => {
        item.addEventListener('input', () => {
            if (!regExp.test(item.value) && item.value.trim() !== '') {
                item.value = '';
                alert('Введите цифры');
                return
            };  
        });
    });
};

const checkInputText = () => {
    const regExp = /^[а-яА-ЯёЁ]+$/,
        placeholders = document.querySelectorAll('[placeholder="Наименование"]');
    
    placeholders.forEach((item) => {
        item.addEventListener('input', () => {
            if (!regExp.test(item.value) && item.value.trim() !== '') {
                item.value = '';
                alert('Используйте русский алфавит!');
                return
            };  
        });
    });
}; 

const check = () => {
    calculateButton.disabled = true;
    checkInputNumber();
    checkInputText();
    salaryAmount.addEventListener('keyup', function() {
        if (salaryAmount.value !== '') calculateButton.disabled = false;
    })
};

class AppData {
    constructor() {
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

    start() {
        const allInputs = document.querySelectorAll('.data input[type="text"]');
        
        this.budget = +salaryAmount.value;
        
        calculateButton.style.display = 'none';
        resetButton.style.display = 'inline-block';
        expensesAdd.disabled = true;
        incomeAdd.disabled = true;

        allInputs.forEach((item) => {
            item.disabled = true;
        });
        
        this.getExpenses();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getIncome();
        this.getIncomeMonth();
        this.getInfoDeposit();
        this.getBudget();
        this.showResult();

    };

    reset() {
        const 
            allInputs = document.querySelectorAll('.data input[type="text"]'),
            allOutputs = document.querySelectorAll('.result input[type="text"]');

        depositCheck.checked = false;
        depositBank.style.display = '';
        depositBank.value = '';
        depositAmount.style.display = '';
        depositPercent.style.display = '';

        allInputs.forEach((item) => {
            item.disabled = false;
            item.value = '';
            periodSelect.value = '1';
            periodAmount.textContent = periodSelect.value;
        });

        allOutputs.forEach((item) => {
            item.value = '';
        });

        incomeItems.forEach((item, i) => {
            item.querySelector('.income-title').disabled = false;
            item.querySelector('.income-amount').disabled = false;
            
            if (i > 0) {
                item.remove();
                incomeAdd.style.display = 'block';
            }
        });
        expensesItems.forEach((item, i) =>{
            item.querySelector('.expenses-title').disabled = false;
            item.querySelector('.expenses-amount').disabled = false;
            
            if (i > 0) {
                item.remove();
                expensesAdd.style.display = 'block';
            }
        });

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
        
        calculateButton.style.display = 'inline-block';
        resetButton.style.display = 'none';
        expensesAdd.disabled = false;
        incomeAdd.disabled = false;
        
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = '0';
        });

        check();
    };

    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();

        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = this.calcSavedMoney();
        });
        
    };

    addExpensesBlock() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';    
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesAdd.before(cloneExpensesItem);
        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            expensesAdd.style.display = 'none';
        }
    };

    getExpenses() {        
        expensesItems.forEach((item) => {
            const 
                itemExpenses = item.querySelector('.expenses-title').value,
                cashExpenses = item.querySelector('.expenses-amount').value;

                if (itemExpenses !== '' && cashExpenses !== '') {
                    this.expenses[itemExpenses] = +cashExpenses;
                }
        });
    };

    getIncome() {
        incomeItems.forEach((item) => {
            const 
                itemIncome = item.querySelector('.income-title').value,
                cashIncome = item.querySelector('.income-amount').value;
                
                if (itemIncome !== '' && cashIncome !== '') {
                    this.income[itemIncome] = +cashIncome;
                }
        })
    };

    addIncomeBlock() {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        
        cloneIncomeItem.querySelector('.income-title').value = '';    
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomeAdd.before(cloneIncomeItem);    
        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            incomeAdd.style.display = 'none';
        }
    };

    getAddExpenses() {   
        let addExpenses = additionalExpensesItem.value.split(', ');

        addExpenses.forEach((item) => {
            item = item.trim();

            if (item !== '') {
                this.addExpenses.push(item);
            }
        })
    };

    getAddIncome () {
        additionalIncomeItems.forEach((item) => {
            let itemValue = item.value.trim();

            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    };

    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        } 
    };

    getIncomeMonth() {
        for (let key in this.income) {
            this.incomeMonth += this.income[key];
        } 
    };

    getBudget() {
        const monthDeposit = Math.floor(this.moneyDeposit * (this.persentDeposit / 100));

        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    };

    getTargetMonth() {
        if ((targetAmount.value / this.budgetDay) > 0) {
            return (`Цель будет достигнута за: ${Math.ceil(targetAmount.value / this.budgetDay)} месяцев`);
        } else {
            return ('Цель не будет достигнута');
        }
    };

    getStatusIncome() {
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

    getInfoDeposit() {
        if (this.deposit) {
            this.persentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    };

    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    };

    changePersent() {
        const valueSelect = this.value;

        if (valueSelect === 'other') {
            
            depositPercent.value = '';
            depositPercent.style.display = 'inline-block';
            depositPercent.addEventListener('input', () => {
                
                if (depositPercent.value >= 0 && depositPercent.value <=100) {
                    this.persentDeposit = +depositPercent.value;
                } else {
                    alert('Введите корректное значение в поле проценты');
                    depositPercent.value = '';
                    calculateButton.disabled = true;
                }
            }); 
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = '';
        }
    };

    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;

            depositBank.addEventListener('change', this.changePersent);
        } else {
            depositBank.style.display = '';
            depositAmount.style.display = '';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;

            depositBank.removeEventListener('change', this.changePersent);
        }
    }

    eventsListeners() {
        calculateButton.addEventListener('click', this.start.bind(this));
        resetButton.addEventListener('click', this.reset);
        expensesAdd.addEventListener('click', this.addExpensesBlock);
        incomeAdd.addEventListener('click', this.addIncomeBlock);
        periodSelect.addEventListener('input', () => {
            periodAmount.textContent = periodSelect.value;
        });
        depositCheck.addEventListener('change', this.depositHandler.bind(this));
    };
}

const appData = new AppData();
appData.eventsListeners();
check();




// Выводы в консоль