// Калькулятор
const calc = (price = 100) => {
	const
		calcBlock = document.querySelector('.calc-block'),
		calcType = document.querySelector('.calc-type'),
		calcSquare = document.querySelector('.calc-square'),
		calcDay = document.querySelector('.calc-day'),
		calcCount = document.querySelector('.calc-count'),
		totalValue = document.getElementById('total');

	//Валидация
	const calculateValidation = () => {
		const
			calcInputs = calcBlock.querySelectorAll('[type="text"]');

		calcInputs.forEach(element => {
			element.addEventListener('input', () => {
				element.value = element.value.replace(/\D/g, '');
			});
		});
	};

	calculateValidation();

	const countSum = () => {
		const
			typeValue = calcType.options[calcType.selectedIndex].value,
			squareValue = +calcSquare.value;

		let total = 0,
			countValue = 1,
			dayValue = 1;

		if (calcCount.value > 1) {
			countValue += (calcCount.value - 1) / 10;
		}

		if (calcDay.value && calcDay.value < 5) {
			dayValue *= 2;
		} else if (calcDay.value && calcDay.value < 10) {
			dayValue *= 1.5;
		}

		if (typeValue && squareValue) {
			total = price * typeValue * squareValue * countValue * dayValue;
		}

		//Запускаем анимацию для totalValue
		animate({
			duration: 100,
			timing(timeFraction) {
				return timeFraction;
			},
			draw(progress) {
				totalValue.textContent = Math.floor(progress * total);
			}
		});
	};

	calcBlock.addEventListener('change', event => {
		const target = event.target;

		if (target.matches('select') || target.matches('input')) {
			countSum();
		}
	});
};

export default calc;
