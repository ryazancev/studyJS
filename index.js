'use strict';

const DomElement = function(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
};

DomElement.prototype.createElem = function() {
    if (this.selector[0] === '.') {
        const div = document.createElement('div');
        div.classList.add(this.selector.slice(0));
        div.style.cssText = 'height: ' + this.height + 'px' + '; \
            width: ' + this.width + 'px' + '; \
            background-color: ' + this.bg + '; \
            font-size: ' + this.fontSize + "px" +';'; 
        div.textContent = 'Я див'    
        document.body.insertAdjacentElement('afterbegin', div);    
    } else if (this.selector[0] === '#') {
        const p = document.createElement('p');
        p.setAttribute('id', this.selector.slice(0));
        p.style.cssText = 'height: ' + this.height + 'px' + '; \
            width: ' + this.width + 'px' + '; \
            background-color: ' + this.bg + '; \
            font-size: ' + this.fontSize + 'px' +';'; 
        p.textContent = 'Я параграф'    
        document.body.insertAdjacentElement('afterbegin', p);        
    }


};

const obj = new DomElement('#selector', 200, 300, 'tomato', 24);
obj.createElem();
console.log(obj);