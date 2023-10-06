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
        switch (button.id) {
            case 'clear':
                display = '';
                operator = '';
                break;
            case '=':
                display !== '' ? calculate() : '';
                operator = '';
                break;
            case '+':
                if (display === '-') {
                    display = '';
                } else if (display !== '') {
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
                break;
            case '-':
                if (display === '') {
                    display = '-';
                } else if ((display[0] === '-' && display.length > 1) || display[0] !== '-') {
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
                break;
            case 'x':
            case '/':
                if (display !== '') {
                    if ((display[0] === '-' && display.length > 1) || display[0] !== '-') {
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
                break;
            default:
                display += button.textContent;
        }

        displayDiv.textContent = display;
    });
});


// b, operator, display =