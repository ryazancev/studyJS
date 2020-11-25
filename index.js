let arr = ['21', '756', '11', '80', '555', '666', '4343'];

arr.forEach(function(item) {
    if (item.startsWith('2') || item.startsWith('4')) {
        console.log(item);
    }
});

// Вторая часть

let n = 100;

function isPrimeNumber(num) {
    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

function getPrimeNumbers(num) {
    
    for (let i = 2; i < num; i++) {
        if (isPrimeNumber(i)) {
            console.log(i + ' Делится на 1 и на ' + i);
        }
    }
}

getPrimeNumbers(n);