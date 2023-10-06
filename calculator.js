function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, operator, b) {
    switch (operator) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case 'x':
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
    }
}

function calculate() {
    const numbers = display.split(/[+-\/x]/g).map(number => +number);
    const result = operate(numbers[0], operator, numbers[1]);
    return result;
}

let display = '';
let operator = '';
const displayDiv = document.getElementById('display');

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (isNaN(button.id)) {
            if (button.id === 'clear') {
                display = '';
                operator = '';
            } else if (button.id === '=') {
                display !== '' ? calculate() : '';
                operator = '';
            } else {
                if (display !== '') {
                    if (operator !== '') {
                        if (isNaN(display[display.length - 1])) {
                            display = display.substring(0, display.length - 1).concat(button.textContent);
                            operator = button.textContent;
                        }
                    } else {
                        display += button.textContent;
                        operator = button.textContent;
                    }
                }
            }
        } else {
            display += button.textContent;
        }

        displayDiv.textContent = display;
    });
});


// b, operator, display =