"use strict";
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = '';
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
    }
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = null;
    }
    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }
        this.currentOperand = this.currentOperand + number.toString();
    }
    chooseOperation(operation) {
        if (this.currentOperand === '')
            return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) {
            return;
        }
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }
    updateDisplay() {
        this.currentOperandTextElement.innerHTML = this.currentOperand;
        if (this.operation !== null && this.operation != undefined) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        }
        else if (this.operation == undefined) {
            this.previousOperandTextElement.innerText = '';
        }
    }
}
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous]');
const currentOperandTextElement = document.querySelector('[data-current]');
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.innerText === ".") {
            calculator.appendNumber(button.innerText);
        }
        else {
            calculator.appendNumber(parseInt(button.innerText));
        }
        calculator.updateDisplay();
    });
});
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});
