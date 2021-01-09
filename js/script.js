'use strict';

function animate({ timing, draw, duration }) {

	const start = performance.now();

	requestAnimationFrame(function animate(time) {
		// timeFraction изменяется от 0 до 1
		let timeFraction = (time - start) / duration;
		if (timeFraction > 1) timeFraction = 1;

		// вычисление текущего состояния анимации
		const progress = timing(timeFraction);

		draw(progress); // отрисовать её

		if (timeFraction < 1) {
			requestAnimationFrame(animate);
		}

	});
}

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
		this.todoData.forEach(item => {
			this.createItem(item);
		});
		this.addToStorage();
	}

	createItem(todo) {
		const li = document.createElement('li');
		li.classList.add('todo-item');
		li.key = todo.key;
		li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-edit"></button>
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
		`);

		if (todo.completed) {
			if (todo.current) {
				li.style.opacity = 0;
				this.todoCompleted.append(li);
				animate({
					duration: 1000,
					timing(timeFraction) {
						return timeFraction;
					},
					draw(progress) {
						li.style.opacity = progress;
					}
				});
			} else {
				this.todoCompleted.append(li);
			}
		} else {
			if (todo.current) {
				li.style.opacity = 0;
				this.todoList.append(li);
				animate({
					duration: 1000,
					timing(timeFraction) {
						return timeFraction;
					},
					draw(progress) {
						li.style.opacity = progress;
					}
				});
			} else {
				this.todoList.append(li);
			}
		}

		delete todo.current;
	}

	deleteItem(target) {
		this.todoData.forEach(item => {
			if (target.key === item.key) {
				animate({
					duration: 1000,
					timing(timeFraction) {
						return timeFraction;
					},
					draw(progress) {
						target.style.opacity = 1 - progress;
					}
				});
				setTimeout(() => {
					this.todoData.delete(item.key);
					this.render();
				}, 1000);

			}
		});
	}

	completedItem(target) {
		this.todoData.forEach(item => {
			if (target.key === item.key) {
				if (!item.completed) {
					item.completed = true;
					item.current = true;
					this.render();
				} else {
					item.current = true;
					item.completed = false;
					this.render();
				}
			}
		});
	}

	editItem(target) {
		this.todoData.forEach(item => {
			if (target.key === item.key) {
				target.children[0].setAttribute('contenteditable', 'true');
			}
		});
	}

	handler() {
		const todoContainer = document.querySelector('.todo-container');

		todoContainer.addEventListener('click', event => {
			const target = event.target;

			if (target.matches('.todo-complete')) this.completedItem(target.closest('.todo-item'));
			if (target.matches('.todo-remove')) this.deleteItem(target.closest('.todo-item'));
			if (target.matches('.todo-edit')) this.editItem(target.closest('.todo-item'));
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
