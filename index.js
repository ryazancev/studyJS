let num = 266219;
let strNum = String(num);
let arrStrNum = strNum.split('');
let res = 1;

for (let i = 0; i < arrStrNum.length; i++) {
    res *= +arrStrNum[i]
}

res = res ** 3;

console.log(String(res).substr(0, 2));


