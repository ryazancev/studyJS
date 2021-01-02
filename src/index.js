'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changePhoto from './modules/changePhoto';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// Таймер
countTimer('20 january 2021');
// Меню
toggleMenu();
// Попап
togglePopup();
// Табы
tabs();
// Слайдер
slider();
// Фотографии
changePhoto();
// Калькулятор
calc(100);
// Отправка формы
sendForm();
