//Карусель в ООП стиле

class Carousel {
	constructor({ main, wrap, next, prev, infinity = false, slidesToShow = 3, responsive = [] }) {
		if (!main || !wrap) { // Если мы не передали обертку слайдера и обертку слайдов
			console.warn('slider-carousel: Необходимо 2 свойства, "main" и "wrap"!');
		}

		this.main = document.querySelector(main);
		this.wrap = document.querySelector(wrap);
		this.slides = document.querySelector(wrap).children;
		this.next = document.querySelector(next);
		this.prev = document.querySelector(prev);
		this.slidesToShow = slidesToShow;
		this.options = {
			position: 0, // Начальная позиция слайда
			infinity,
			maxPosition: this.slides.length - this.slidesToShow, // Вычислим максимальную позицию
			widthSlide: Math.floor(100 / this.slidesToShow) // Сколько слайдов будет на экране
		};
		this.responsive = responsive;
	}

	init() {
		this.addClass(); //Добавим классы на слайды
		this.addStyle(); //Добавим стили на слайды

		if (this.prev && this.next) {// Если у нас есть кнопки в разметке
			this.controlSlider(); 
		} else { // Если кнопок нет
			this.addArrow();
			this.controlSlider();
		}

		if (this.responsive) { //Если нужна адаптивность
			this.responseInit();
		}
	}

	addClass() {
		this.main.classList.add('slider'); //Добавим класс для обертки слайдера
		this.wrap.classList.add('slider__wrap'); //Добавим класс для обертки слайдов

		for (const item of this.slides) {
			item.classList.add('slider__item'); // Добавим классы самим слайдам
		}
	}

	addStyle() {
		let style = document.getElementById('carousel-style'); // Присвоим стили по id 

		if (!style) { // Если стилей с таким id нет, то добавим их
			style = document.createElement('style');
			style.id = 'carousel-style';
		}

		style.textContent = `
			.slider {
				overflow: hidden !important;
			}

			.slider__wrap {
				display: flex !important;
				transition: transform 0.5s !important;
				will-change: transform !important;
			}

			.slider__item {
				display: flex !important;
				align-items: center;
				justify-content: space-around;
				flex: 0 0 ${this.options.widthSlide}% !important;
				margin: auto 0 !important;
			}
		`;
		document.head.append(style); // Добавим стили в разметку в конец тега head
	}

	controlSlider() { // Повесим обработчик клик на кнопки
		this.prev.addEventListener('click', this.prevSlider.bind(this)); 
		this.next.addEventListener('click', this.nextSlider.bind(this));
	}

	prevSlider() {
		if (this.options.infinity || this.options.position > 0) { 
			--this.options.position; // отнимаем начальную позицию по нажатию на <
			if (this.options.position < 0) {
				this.options.position = this.options.maxPosition; // Если мы дошли до начала то вернемся к последнему слайду
			}
			this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`; // Перемещаем слайды назад
		}
	}

	nextSlider() {
		if (this.options.infinity || this.options.position < this.options.maxPosition) {
			++this.options.position;
			if (this.options.position > this.options.maxPosition) {
				this.options.position = 0; // Если мы дошли до конца то вернемся к первому слайду
			}
			this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`; //Перемещаем слайды вперед
		}
	}

	addArrow() { // Добавим кнопки если их нет в разметке
		this.prev = document.createElement('button');
		this.next = document.createElement('button');
		this.prev.className = 'slider__prev';
		this.next.className = 'slider__next';
		this.main.append(this.prev);
		this.main.append(this.next);

		const style = document.createElement('style');
		style.textContent = `
			.slider__prev,
			.slider__next {
				margin: 0 10px;
				border: 20px solid transparent;
				background-color: transparent;
				cursor: pointer;
			}

			.slider__next {
				border-left-color: #19b5fe;
			}

			.slider__prev {
				border-right-color: #19b5fe;
			}

			.slider__prev:hover,
			.slider__next:hover,
			.slider__prev:focus,
			.slider__next:focus {
				background-color: transparent;
				outline: transparent;
			}
		`;
		document.head.append(style);
	}

	responseInit() {
		const slidesToShowDefault = this.slidesToShow; // какое кол-во слайдов на экран по умолчанию
		const allResponse = this.responsive.map(item => item.breackpoint); // Присвоим в переменную размеры дисплея
		const maxResponse = Math.max(...allResponse); // Присвоим в переменную максимальный брейкпоинт

		const checkResponse = () => {
			const widthWindow = document.documentElement.clientWidth; // Размеры окна без полосы прокрутки

			if (widthWindow < maxResponse) {
				for (let i = 0; i < allResponse.length; i++) {
					if (widthWindow < allResponse[i]) {
						this.slidesToShow = this.responsive[i].slidesToShow;
						this.options.widthSlide = Math.floor(100 / this.slidesToShow);
						this.addStyle();
					}
				}
			} else {
				this.slidesToShow = slidesToShowDefault;
				this.options.widthSlide = Math.floor(100 / this.slidesToShow);
				this.addStyle();
			}
		};

		checkResponse();

		window.addEventListener('resize', checkResponse);

	}
}

export default Carousel;
