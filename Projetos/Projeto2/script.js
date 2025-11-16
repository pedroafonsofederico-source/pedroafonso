let display = document.getElementById('display');
let currentExpression = '';

function addButtonEffects() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mousedown', function () {
            this.classList.add('active');
        });

        button.addEventListener('mouseup', function () {
            this.classList.remove('active');
        });

        button.addEventListener('mouseleave', function () {
            this.classList.remove('active');
        });
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 300); 
            });
        });

    });
}

function lightUpButton(key) {
    const buttonMap = {
        '0': 'button[onclick*="0"]',
        '1': 'button[onclick*="1"]',
        '2': 'button[onclick*="2"]',
        '3': 'button[onclick*="3"]',
        '4': 'button[onclick*="4"]',
        '5': 'button[onclick*="5"]',
        '6': 'button[onclick*="6"]',
        '7': 'button[onclick*="7"]',
        '8': 'button[onclick*="8"]',
        '9': 'button[onclick*="9"]',
        '.': 'button[onclick*="."]',
        '+': 'button[onclick*="+"]',
        '-': 'button[onclick*="-"]',
        '*': 'button[onclick*="*"]',
        '/': 'button[onclick*="/"]',
        'Enter': 'button[onclick*="calculate"]',
        '=': 'button[onclick*="calculate"]',
        'Escape': 'button[onclick*="clearAll"]',
        'c': 'button[onclick*="clearAll"]',
        'C': 'button[onclick*="clearAll"]',
        'Backspace': 'button[onclick*="backspace"]'
    };

    const selector = buttonMap[key];
    if (selector) {
        const button = document.querySelector(selector);
        if (button) {
            button.classList.add('active', 'led-effect');
            setTimeout(() => {
                button.classList.remove('active', 'led-effect');
            }, 300);
        }
    }
}

function pressed(value,) {
    event.target.classList.add('active', 'led-effect');
    setTimeout(() => {
        event.target.classList.remove('active', 'led-effect');
    }, 300);


    if (value === '.' && currentExpression.includes('.') && !currentExpression.match(/[\+\-\*\/]/)) {
        return;
    }


    if ('+-*/'.includes(value)) {
        const lastChar = currentExpression.slice(-1);
        if ('+-*/'.includes(lastChar)) {
            currentExpression = currentExpression.slice(0, -1) + value;
        } else {
            currentExpression += value;
        }
    } else {
        currentExpression += value;
    }

    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentExpression === '' ? '0' : currentExpression;
}

function calculate() {
    try {
        const equalsButton = document.querySelector('button[onclick*="calculate"]');
        if (equalsButton) {
            equalsButton.classList.add('active', 'led-effect');
            setTimeout(() => {
                equalsButton.classList.remove('active', 'led-effect');
            }, 300);
        }

        if (currentExpression === '') return;

        const result = eval(currentExpression);
        currentExpression = parseFloat(result.toFixed(10)).toString();
        updateDisplay();
    } catch (error) {
        display.textContent = 'Error';
        currentExpression = '';
        setTimeout(() => {
            updateDisplay();
        }, 1000);
    }
}

function clearAll() {
    currentExpression = '';
    updateDisplay();
}

function backspace() {
    if (currentExpression.length > 0) {
        currentExpression = currentExpression.slice(0, -1);
        updateDisplay();
    }
}

function handleKeyPress(key) {
    const keyMap = {
        '0': () => pressed('0'),
        '1': () => pressed('1'),
        '2': () => pressed('2'),
        '3': () => pressed('3'),
        '4': () => pressed('4'),
        '5': () => pressed('5'),
        '6': () => pressed('6'),
        '7': () => pressed('7'),
        '8': () => pressed('8'),
        '9': () => pressed('9'),
        '.': () => pressed('.'),
        '+': () => pressed('+'),
        '-': () => pressed('-'),
        '*': () => pressed('*'),
        '/': () => pressed('/'),
        'Enter': calculate,
        '=': calculate,
        'Escape': clearAll,
        'c': clearAll,
        'C': clearAll,
        'Backspace': backspace
    };

    if (keyMap[key]) keyMap[key]();
}

document.addEventListener('keydown', function (event) {
    const key = event.key;
    lightUpButton(key);
    handleKeyPress(key);
});

document.addEventListener('DOMContentLoaded', function () {
    addButtonEffects();
    updateDisplay();
});

