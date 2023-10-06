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

function modulo(a, b) {
    return a % b;
}

function operate(a, operator, b) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (operator) {
        case '+':
            return +add(a, b).toFixed(10);
        case '-':
            return +subtract(a, b).toFixed(10);
        case 'x':
            return +multiply(a, b).toFixed(10);
        case '/':
            return +divide(a, b).toFixed(10);
        case '%':
            return +modulo(a, b).toFixed(10);
    }
}

let a = '';
let operator = '';
let b = '';
const displayDiv = document.getElementById('display');

function updateDisplay(button) {
    if (a === '') {        // Only the -, .,  numbers do anything
        if (button === '-' || !isNaN(button)) {
            a = button;
        } else if (button === '.') {
            a = '0.';
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
                    if (button === '0') {
                        a = button;
                    } else {
                        a += button;
                    }
                } else if (button === '.') {
                    a = '0.';
                }
            } else { // All operators, numbers work
                if (isNaN(button)) {
                    if (button === '.' && !a.includes('.')) {
                        a += button;
                    } else if (button !== '=' && button !== '.') {
                        operator = button;
                    }
                } else {
                    a += button;
                }
            }
        } else { // All operators, numbers work
            if (isNaN(button)) {
                if (button === '.' && !a.includes('.')) {
                    a += button;
                } else if (button !== '=' && button !== '.') {
                    operator = button;
                }
            } else if (a !== '0') {
                a += button;
            } else {
                a = button;
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
        } else if (isNaN(button)) {
            if (button === '.') {
                b = '0.';
            } else if (button !== '=') {
                operator = button;
            }
        } else {
            b = button;
        }
    } else { // All strings not empty
        if (button === 'backspace') {
            b = b.substring(0, b.length - 1);
        } else if (button === '=') {
            if (b !== '-') {
                if (b === '0' && operator === '/') {
                    alert("Fool! Did you not know that you can't divide by zero?");
                } else {
                    a = operate(a, operator, b).toString();
                    operator = '';
                    b = '';
                }
            }
        } else if (isNaN(button)) {
            if (b === '-' && button !== '-' && button !== '.') {
                operator = button;
                b = '';
            } else if (b === '0' && button === '-') {
                b = '-';
            } else if (button === '.' && !b.includes('.')) {
                if (b === '-') {
                    b = '0.';
                } else {
                    b += button;
                }
            }
        } else if (b !== '0') {
            b += button;
        } else {
            b = button;
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

const validKeys = Array.from(document.querySelectorAll('button')).map(button => button.id);
document.addEventListener('keydown', e => {
    let key = e.key;

    if (e.key === 'Backspace') {
        key = 'backspace';
    } else if (e.key === 'Enter') {
        key = '=';
    } else if (e.key === 'Escape') {
        key = 'clear';
    }

    if (validKeys.includes(key)) {
        updateDisplay(key);
    }
})