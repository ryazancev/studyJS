let lang;
lang = 'ru';

if (lang === 'ru') {
    console.log('пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс');
} else if (lang === 'en') {
    console.log('mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn');
}

switch (lang) {
    case 'ru':
        console.log('пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс');
        break;
    case 'en':
        console.log('mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn');
        break;
}


let arr = {
	'ru':['пн', 'вт', 'ср','чт', 'пт', 'сб', 'вс'],
	'en':['mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn'],
};
console.log(arr[lang]);

// Вторая часть задания

let namePerson = ''; 
let res = namePerson === 'Артем' 
    ? console.log('Директор') 
    : namePerson === 'Максим' 
    ? console.log('Преподаватель') 
    : console.log('Студент');
