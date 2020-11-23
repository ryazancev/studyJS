let lang;
lang = 'en';

// if (lang === 'ru') {
//     console.log('пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс');
// } else if (lang === 'en') {
//     console.log('mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn');
// }

// switch (lang) {
//     case 'ru':
//         console.log('пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс');
//         break;
//     case 'en':
//         console.log('mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn');
//         break;
// }

// let arr = [
//     ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'], 
//     ['mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn']
// ]


let arr = {
	'ru':['пн', 'вт', 'ср','чт', 'пт', 'сб', 'вс'],
	'en':['mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn'],
};
console.log(arr[lang]);