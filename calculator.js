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
    a = parseInt(a);
    b = parseInt(b);

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

let a = '';
let operator = '';
let b = '';
const displayDiv = document.getElementById('display');

function updateDisplay(button) {
    if (a === '') {
        // Only the -, numbers do anything
        if (button === '-' || !isNaN(button)) {
            a = button;
        }
    } else if (button === 'clear') {
        a = '';
        operator = '';
        b = '';
    } else if (operator === '') { // a is not empty
        if (button === 'backspace') {
            a = a.substring(0, a.length - 1);
        } else if (a[0] === '-') {
            // Only  +, numbers do anything
            if (a.length === 1) {
                if (button === '+') {
                    a = '';
                } else if (!isNaN(button)) {
                    a += button;
                }
            } else { // All operators, numbers work
                if (button !== '=' && isNaN(button)) {
                    operator = button;
                } else {
                    a += button;
                }
            }
        } else { // All operators, numbers work
            if (button !== '=' && isNaN(button)) {
                operator = button;
            } else {
                a += button;
            }
        }
    } else if (b === '') { // a and operator not empty
        if (button === 'backspace') {
            operator = '';
        } else if (button === '-') {
            // Only makes b negative if operator is x, /
            if (operator === 'x' || operator === '/') {
                b = '-';
            } else if (operator === '+') { // Only makes operator - if b is negative or operator is +
                operator = '-';
            }
        } else if (button !== '=' && isNaN(button)) {
            operator = button;
        } else {
            b = button;
        }
    } else { // All strings not empty
        if (button === 'backspace') {
            b = b.substring(0, b.length - 1);
        } else if (button === '=') { // Only works if b is not '-'
            if (b !== '-') {
                a = operate(a, operator, b);
                operator = '';
                b = '';
            }
        } else if (isNaN(button)) { // Only works if b is '-'
            if (b === '-') {
                operator = button;
                b = '';
            }
        } else {
            b += button;
        }
    }

    displayDiv.textContent = `${a} ${operator} ${b}`;
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        updateDisplay(button.id);
    });
});