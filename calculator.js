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

function calculate(display) {

}

let display = '';
const displayDiv = document.getElementById('display');

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    if (isNaN(button.id)) {
        if (button.id === 'clear') {
            button.addEventListener('click', () => {
                display = '';
                displayDiv.textContent = display;
            });
        } else if (button.id === '=') {
            button.addEventListener('click', () => {
                display = calculate(display);
                displayDiv.textContent = display;
            });
        } else {
            button.addEventListener('click', () => {
                if (display !== '') {
                    if (isNaN(display[display.length - 1])) {
                        display = display.substring(0, display.length - 1).concat(button.textContent);
                    } else {
                        display += button.textContent;
                    }
                    displayDiv.textContent = display;
                }
            });
        }
    } else {
        button.addEventListener('click', () => {
            display += button.textContent;
            displayDiv.textContent = display;
        });
    }
});


// b, operator, display =