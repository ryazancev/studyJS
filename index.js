'use strict';
const
    input = document.querySelector('input'),
    paragraph = document.querySelector('p');

const debounce = (fn, msec) => {
    let lastCall = 0,
        lastCallTimer = 0;

    return (...args) => {
        const prevCall = lastCall;
        lastCall = Date.now();
        if (prevCall && (lastCall - prevCall) < msec) {
            clearTimeout(lastCallTimer)
        }
        lastCallTimer = setTimeout(() => {
            fn(...args)
        }, msec)
    }
};

const showText = value => {
    paragraph.textContent = value;
};

const showTextDebounce = debounce(showText, 300)

input.addEventListener('input', () => {
    showTextDebounce(input.value)
})