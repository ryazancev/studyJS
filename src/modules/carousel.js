//Карусель в ООП стиле

class Carousel {
	constructor({ main, wrap, next, prev, infinity = false, slidesToShow = 3, responsive = [] }) {
		if (!main || !wrap) {
			console.warn('slider-carousel: Необходимо 2 свойства, "main" и "wrap"!');
		}

		this.main = document.querySelector(main);
		this.wrap = document.querySelector(wrap);
		this.slides = document.querySelector(wrap).children;
		this.next = document.querySelector(next);
		this.prev = document.querySelector(prev);
		this.slidesToShow = slidesToShow;
		this.options = {
			position: 0,
			infinity,
			maxPosition: this.slides.length - this.slidesToShow,
			widthSlide: Math.floor(100 / this.slidesToShow)
		};
		this.responsive = responsive;
	}

	init() {
		this.addClass();
		this.addStyle();

		if (this.prev && this.next) {
			this.controlSlider();
		} else {
			this.addArrow();
			this.controlSlider();
		}

		if (this.responsive) {
			this.responseInit();
		}
	}

	addClass() {
		this.main.classList.add('slider');
		this.wrap.classList.add('slider__wrap');

		for (const item of this.slides) {
			item.classList.add('slider__item');
		}
	}

	addStyle() {
		let style = document.getElementById('carousel-style');

		if (!style) {
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
		document.head.append(style);
	}

	controlSlider() {
		this.prev.addEventListener('click', this.prevSlider.bind(this));
		this.next.addEventListener('click', this.nextSlider.bind(this));
	}

	prevSlider() {
		if (this.options.infinity || this.options.position > 0) {
			--this.options.position;
			if (this.options.position < 0) {
				this.options.position = this.options.maxPosition;
			}
			this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
		}
	}

	nextSlider() {
		if (this.options.infinity || this.options.position < this.options.maxPosition) {
			++this.options.position;
			if (this.options.position > this.options.maxPosition) {
				this.options.position = 0;
			}
			this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
		}
	}

	addArrow() {
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
		const slidesToShowDefault = this.slidesToShow;
		const allResponse = this.responsive.map(item => item.breackpoint);
		const maxResponse = Math.max(...allResponse);
		console.log(maxResponse);

		const checkResponse = () => {
			const widthWindow = document.documentElement.clientWidth;

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
