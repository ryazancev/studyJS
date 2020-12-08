'use strict';

const DomElement = function(selector, height, width, bg, position) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.position = position;
};

DomElement.prototype.createElem = function() {
    if (this.selector[0] === '.') {
        const div = document.createElement('div');
        div.classList.add(this.selector.slice(1));
        div.style.cssText = 'height: ' + this.height + 'px' + '; \
            width: ' + this.width + 'px' + '; \
            background-color: ' + this.bg + '; \
            position: ' + this.position + ';'; 
        div.textContent = 'Я див'    
        document.body.insertAdjacentElement('afterbegin', div);    
    } else if (this.selector[0] === '#') {
        const p = document.createElement('p');
        p.setAttribute('id', this.selector.slice(1));
        p.style.cssText = 'height: ' + this.height + 'px' + '; \
            width: ' + this.width + 'px' + '; \
            background-color: ' + this.bg + '; \
            position: ' + this.position + ';';  
        p.textContent = 'Я параграф'    
        document.body.insertAdjacentElement('afterbegin', p);        
    }


};

document.addEventListener('DOMContentLoaded', function() {
    const obj = new DomElement('.selector', 100, 100, 'tomato', 'absolute');
    obj.createElem();
});

document.addEventListener('keydown', function(evt) {
    const elem = document.querySelector('.selector');
    const pxNum = 10;
    if (evt.code === "ArrowUp") {
        if (parseInt(elem.style.top) > 0) {
            elem.style.top = parseInt(elem.style.top) - pxNum + 'px';    
        } else {
            elem.style.top = '-' + pxNum + 'px';
        }
    } else if (evt.code === "ArrowRight") {
        if (parseInt(elem.style.left) > 0) {
            elem.style.left = parseInt(elem.style.left) + pxNum + 'px';    
        } else {
            elem.style.left = pxNum + 'px';
        }
    }
    if (evt.code === "ArrowDown") {
        if (parseInt(elem.style.top) > 0) {
            elem.style.top = parseInt(elem.style.top) + pxNum + 'px';    
        } else {
            elem.style.top = pxNum + 'px';
        } 
    }
    if (evt.code === "ArrowLeft") {
        if (parseInt(elem.style.left) > 0) {
            elem.style.left = parseInt(elem.style.left) - pxNum + 'px';    
        } else {
            elem.style.left = '-' + pxNum + 'px';
        }
    }
});