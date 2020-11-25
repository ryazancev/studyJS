let arr = ['21', '756', '11', '80', '555', '666', '4343'];

arr.forEach(function(item) {
    if (item.startsWith('2') || item.startsWith('4')) {
        console.log(item);
    }
});

// Вторая часть

let n = 100;

nextPrime:
for (let i = 2; i <= n; i++) { 

    for (let j = 2; j < i; j++) { 
        if (i % j === 0) continue nextPrime; 
    }

    console.log(i + ' Делится на 1 и на ' + i); // простое число
}