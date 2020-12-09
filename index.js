'use strict';

class First {
    hello() {
        console.log('Привет, я метод родителя');
    }
};

class Second extends First {
    hello() {
        super.hello();
        console.log('А я наследуемый метод!');
    }
};

const
    obj1 = new First(),
    obj2 = new Second();

obj1.hello();
obj2.hello();
