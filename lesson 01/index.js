let money = 30000; 
let income = 'кухня'; 
let addExpenses = 'арнеда, интернет, такси, автобус, еда'; 
let deposit = true; 
let mission = 100000; 
let period = 6;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

addExpenses = addExpenses.toLowerCase().split(', ');
console.log(addExpenses);

let budgetDay = money / 30;
console.log(budgetDay);