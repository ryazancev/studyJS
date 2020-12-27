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
        
        this.getExpInc();
        this.getExpensesMonth();
        this.getAddExpInc();
        this.getIncomeMonth();
        this.getBudget();
        this.showResult();

    };

    reset() {
        const 
            allInputs = document.querySelectorAll('.data input[type="text"]'),
            allOutputs = document.querySelectorAll('.result input[type="text"]');

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
	
	getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value,
                itemAmount = item.querySelector(`.${startStr}-amount`).value;
			
			if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemAmount] = +itemAmount;
            }
        }
        expensesItems.forEach(count);
        incomeItems.forEach(count);
    };

	addBlock(target) {
		let startStr;

		if (target.matches('.income_add')) {
			startStr = target.closest('.income').className;
		}
		if (target.matches('.expenses_add')) {
			startStr = target.closest('.expenses').className;
		}

		let items = document.querySelectorAll(`.${startStr}-items`);
		const cloneItem = items[0].cloneNode(true);
		
		cloneItem.querySelector(`.${startStr}-title`).value = '';    
		cloneItem.querySelector(`.${startStr}-amount`).value = '';
		target.before(cloneItem);

        items = document.querySelectorAll(`.${startStr}-items`);

        if (items.length === 3) {
            target.style.display = 'none';
        }
	};
	
	getAddExpInc () {	

			let addExpenses = additionalExpensesItem.value.split(', ');
	
			addExpenses.forEach(item => {
				item = item.trim();
	
				if (item !== '') {
					this.addExpenses.push(item);
				}
			})
		
			additionalIncomeItems.forEach(item => {
				let itemValue = item.value.trim();
	
				if (itemValue !== '') {
					this.addIncome.push(itemValue);
				}
			});
	};


    getExpensesMonth() {
        for (let key in appData.expenses) {
            this.expensesMonth += this.expenses[key];
        } 
    };

    getIncomeMonth() {
        for (let key in appData.income) {
            this.incomeMonth += this.income[key];
        } 
    };

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    };

    getTargetMonth() {
        if ((targetAmount.value / this.budgetDay) > 0) {
            return ('Цель будет достигнута за: ' + Math.ceil(targetAmount.value / this.budgetDay) + ' месяцев');
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

    calcSavedMoney() {
        return this.budgetMonth * periodSelect.value;
    };

    eventsListeners() {
        calculateButton.addEventListener('click', this.start.bind(this));
        resetButton.addEventListener('click', this.reset);
        expensesAdd.addEventListener('click', evt => {
			let target = evt.target;
			this.addBlock(target);
		});
        incomeAdd.addEventListener('click', evt => {
			const target = evt.target;
			this.addBlock(target);
		});
        periodSelect.addEventListener('input', () => {
            periodAmount.textContent = periodSelect.value;
        });
    };
}

const appData = new AppData();
appData.eventsListeners();
check();




// Выводы в консоль