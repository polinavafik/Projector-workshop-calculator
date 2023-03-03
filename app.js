"use strict";

const input = document.querySelector('.input');
const numbers = document.querySelectorAll('.number');
const result = document.querySelector('.result');
const clear = document.querySelector('.clear');
const operators = document.querySelector('.operator')

let isResultDisplayed = false;



operators.forEach((operator) => {
    operator.addEventListener('click', (event) => {
        const inputValue = input.innerHTML;
        const lastChar = inputValue[inputValue.length - 1];

        if (inputValue.length === 0) {
            return null
        } else if (
            lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷" || lastChar === "."
        ) {
            const newString = inputValue.substring(0, inputValue.length - 1) + event.target.innerHTML;
            input.innerHTML = newString;
        } else {
            input.innerHTML += event.target.innerHTML;
        }
    })
})


numbers.forEach((number) => {
    number.addEventListener('click', (event) => {
        const inputValue = input.innerHTML;
        const lastChar = inputValue[inputValue.length - 1];

        if (isResultDisplayed === false) {
            input.innerHTML += event.target.innerHTML;
        } else if (isResultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷" || lastChar === ".") {
            input.innerHTML += event.target.innerHTML;
            isResultDisplayed = false
        } else {
            input.innerHTML += event.target.innerHTML;
            input.innerHTML = '';
            isResultDisplayed = false;
        }
    })
})

clear.addEventListener('click', () => {
    input.innerHTML = '';
})

result.addEventListener('click', () => {
    const inputValue = input.innerHTML;
    const lastChar = inputValue[inputValue.length - 1];

    if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷" || lastChar === ".") {
        return null
    }

    const onlyNumbers = inputValue.split(/\+|\-|\÷|\×/g);

    const onlyOperators = inputValue.replace(/[0-9]\./g, '').split('');

    let dividerIndex = onlyOperators.indexOf('÷');
    while (dividerIndex !== -1) {
        onlyNumbers.splice(dividerIndex, 2, onlyNumbers[dividerIndex] / onlyNumbers[dividerIndex + 1]);
        onlyOperators.splice(dividerIndex, 1);
        dividerIndex = onlyOperators.indexOf('÷');
    }

    let multiplyIndex = onlyOperators.indexOf('×');
    while (multiplyIndex !== -1) {
        onlyNumbers.splice(multiplyIndex, 2, onlyNumbers[multiplyIndex] * onlyNumbers[multiplyIndex + 1]);
        onlyOperators.splice(multiplyIndex, 1);
        multiplyIndex = onlyOperators.indexOf('×');
    }

    let substractIndex = onlyOperators.indexOf('-');
    while (substractIndex !== -1) {
        onlyNumbers.splice(substractIndex, 2, onlyNumbers[substractIndex] - onlyNumbers[substractIndex + 1]);
        onlyOperators.splice(substractIndex, 1);
        substractIndex = onlyOperators.indexOf('-');
    }

    let addIndex = onlyOperators.indexOf('+');
    while (addIndex !== -1) {
        onlyNumbers.splice(addIndex, 2, parseInt(onlyNumbers[addIndex]) + parseInt(onlyNumbers[addIndex + 1]));
        onlyOperators.splice(addIndex, 1);
        addIndex = onlyOperators.indexOf('+');
    }

    input.innerHTML = onlyNumbers.innerHTML[0]
    isResultDisplayed = true

})

