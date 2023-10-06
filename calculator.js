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
            return add(a,b);
            break;
        case '-':
            return subtract(a,b);
            break;
        case 'x':
            return multiply(a,b);
            break;
        case '/':
            return divide(a,b);
    }
}

let display = '';

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    if (button.id === 'clear') {
        button.addEventListener('click', () => {
            display = '';
            const displayDiv = document.getElementById('display');
            displayDiv.textContent = display;
            console.log(display);
        });
    } else {
        button.addEventListener('click', () => {
            display += button.textContent;
            const displayDiv = document.getElementById('display');
            displayDiv.textContent = display;
            console.log(display);
        });
    }
});


// b, operator, display =