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
			this.input.value = '';
		} else {
			alert('пустое дело добавить нельзя!');
		}
	}

	generateKey() {
		return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
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

	deleteItem(target) {
		this.todoData.forEach(item => {
			if (target.key === item.key) {
				this.todoData.delete(item.key);
				this.render();
			}
		});
	}

	completedItem(target) {
		this.todoData.forEach(item => {
			if (target.key === item.key) {
				if (!item.completed) {
					item.completed = true;
					this.render();
				} else {
					item.completed = false;
					this.render();
				}
			}
		});
		console.log(this.todoData);
	}

	handler() {
		const todoContainer = document.querySelector('.todo-container');

		todoContainer.addEventListener('click', event => {
			const target = event.target;

			if (target.matches('.todo-complete')) this.completedItem(target.closest('.todo-item'));

			if (target.matches('.todo-remove')) this.deleteItem(target.closest('.todo-item'));
		});
	}

	init() {
		this.form.addEventListener('submit', this.addTodo.bind(this));
		this.render();
		this.handler();
	}
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();
