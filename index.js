function changeString(str) {
    if (typeof str !== 'string') {
        alert('В качестве аргумента необходимо передать строку');
    }

    if (str.length >= 30) {
        console.log(str.trim().substr(0, 30) + '...');
    } else {
        console.log(str.trim());
    }
}

