class Calculator{
    previousOperandTextElement: Element | null;
    currentOperandTextElement: Element | null;
    currentOperand: string = '';
    previousOperand: string = '';
    operation: string | undefined;
    constructor(previousOperandTextElement: Element | null, currentOperandTextElement: Element | null){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
    }

    clear(): void{
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    } //clear all inputs

    delete(){

    }

    appendNumber(number: number | string): void{
        if(number === '.' && this.currentOperand.includes('.')){ return; } //just allows one period '.'
        this.currentOperand = this.currentOperand + number.toString();
    }

    chooseOperation(operation: string){
        if(this.currentOperand === '') return;
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let computation: number;
        const prev: number = parseFloat(this.previousOperand);
        const current: number = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)){ return; }
    }

    updateDisplay(): void{
        this.currentOperandTextElement!.innerHTML = this.currentOperand;
        this.previousOperandTextElement!.innerHTML = this.previousOperand;
    }
}

const numberButtons: NodeListOf<Element> = document.querySelectorAll('[data-number]');
const operationButtons: NodeListOf<Element> = document.querySelectorAll('[data-operation]');
//Element | null = is of type Element or Null
const equalsButton: Element | null = document.querySelector('[data-equals]');
const deleteButton: Element | null = document.querySelector('[data-delete]');
const allClearButton: Element | null = document.querySelector('[data-all-clear]');
const previousOperandTextElement: Element | null = document.querySelector('[data-previous]');
const currentOperandTextElement: Element | null = document.querySelector('[data-current]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        if((<HTMLElement>button).innerText === "."){
            calculator.appendNumber((<HTMLElement>button).innerText) //sees if entry is a period
        }else{
            calculator.appendNumber(parseInt((<HTMLElement>button).innerText))
        }
        calculator.updateDisplay();
    })
    //button = Element -> cast para HTMLElement -> innerText returna string -> parseInt(String)
});

operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseOperation((<HTMLElement>button).innerText)
        calculator.updateDisplay();
    })
});

equalsButton!.addEventListener('click', button =>{
    calculator.compute();
    calculator.updateDisplay();
})