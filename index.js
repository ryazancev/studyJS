function changeString(str) {
    if (typeof str !== 'string') {
        alert('В качестве аргумента необходимо передать строку');
    } else {
        console.log(str.trim());
    }

    if (str.length > 30) {
        console.log(str.substr(0, 30) + '...');
    }
}

