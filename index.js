const colorElem = document.getElementById('color');

const setBg = function () {
    let randomColor = Math.random().toString(16).slice(2, 8);

    document.body.style.backgroundColor = "#" + randomColor;
    colorElem.textContent = "#" + randomColor;
}

genNew.addEventListener("click", setBg);
setBg();

