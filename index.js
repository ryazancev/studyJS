'use strict';
const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const render = function() {
    
    if (localStorage.getItem('todolist')) {
        todoData = JSON.parse(localStorage.getItem('todolist'));
    }

    todoList.textContent = '';
    todoCompleted.textContent = '';
    
    todoData.forEach(function(item, i) {
        const li = document.createElement('li');
        
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
        '<div class="todo-buttons">' + 
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
        '</div>';
        
        if (item.complited) {
            todoCompleted.append(li);
            headerInput.value = '';
        } else {
            todoList.append(li);
            headerInput.value = '';
        }

        const todoCompleteButton = li.querySelector('.todo-complete');
        const todoRemoveButton = li.querySelector('.todo-remove');
        
        todoCompleteButton.addEventListener('click', function() {
            item.complited = !item.complited;
            uploadLocal();
            render();
        });

        todoRemoveButton.addEventListener('click', function() {
            todoData.splice(i, 1);
            uploadLocal();
            render();
        })
    });
    
};


todoControl.addEventListener('submit', function(evt) {
    evt.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false
    };

    if (newTodo.value !== '') {
        todoData.push(newTodo);
        uploadLocal();
    }
    
    render();
});

const uploadLocal = function () {
    localStorage.setItem('todolist', JSON.stringify(todoData));
};

render();