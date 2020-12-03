'use strict';
// Заменить картинку заднего фона на другую из папки image
// Обьявляем переменные
const books = document.querySelector('.books'),
    bookCollections = document.querySelectorAll('.book'),
    adv = document.querySelector('.adv'),
    headLink = bookCollections[4].querySelector('a'),
    bookTwoElems = bookCollections[0].querySelectorAll('li'),
    bookFiveElems = bookCollections[5].querySelectorAll('li'),
    bookSixElems = bookCollections[2].querySelectorAll('li'),
    newHead = document.createElement('li');

// Функционал
books.prepend(bookCollections[1]);
books.append(bookCollections[2]);
bookCollections[4].after(bookCollections[3]);

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)'

headLink.textContent = 'Книга 3. this и Прототипы Объектов';

adv.remove();

bookTwoElems[8].after(bookTwoElems[4]);
bookTwoElems[4].after(bookTwoElems[5]);
bookTwoElems[10].before(bookTwoElems[2]);
bookTwoElems[9].before(bookTwoElems[7]);

bookFiveElems[3].before(bookFiveElems[9]);
bookFiveElems[6].before(bookFiveElems[2]);
bookFiveElems[8].before(bookFiveElems[5]);

newHead.textContent = 'Глава 8: За пределами ES6';
bookSixElems[8].after(newHead);


// Выводы в консоль
console.log(bookFiveElems);