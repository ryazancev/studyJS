'use strict';

class Todo {
	constructor(form, input, todoList, todoCompleted) {
		this.form = document.querySelector(form);
		this.input = document.querySelector(input);
		this.todoList = document.querySelector(todoList);
		this.todoCompleted = document.querySelector(todoCompleted);
		this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
	}

	addToStorage() {
		localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
	}

	addTodo(event) {
		event.preventDefault();
		if (this.input.value.trim()) {
			const newTodo = {
				value: this.input.value,
				completed: false,
				key: this.generateKey()
			};
			this.todoData.set(newTodo.key, newTodo);
			this.render();
		}
	}

	generateKey() {
		return Math.random().toString(36).substring(2, 15) + Math.random.toString(36).substring(2, 15);
	}

	render() {
		this.todoList.textContent = '';
		this.todoCompleted.textContent = '';
		this.todoData.forEach(this.createItem, this); //Передадим this 2 параметром, т.к callback не имеет приаязки
		this.addToStorage();
	}

	createItem(todo) {
		const li = document.createElement('li');
		li.classList.add('todo-item');
		li.key = todo.key;
		li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);

		if (todo.completed) {
			this.todoCompleted.append(li);
		} else {
			this.todoList.append(li);
		}
	}

	deleteItem() {

	}

	completedItem() {

	}

	handler() {
		const todoContainer = document.querySelector('.todo-container');

		todoContainer.addEventListener('click', event => {
			const target = event.target;
			console.log(target);
		});
	}

	init() {
		this.form.addEventListener('click', this.addTodo.bind(this));
		this.render();
	}
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();
