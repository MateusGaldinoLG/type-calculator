class Calculator{
    previousOperandTextElement: Element | null;
    currentOperandTextElement: Element | null;
    currentOperand: string = '';
    previousOperand: string = '';
    operation: string | null | undefined;
    constructor(previousOperandTextElement: Element | null, currentOperandTextElement: Element | null){
        this.operation = '';
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
    }

    clear(): void{
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = null;
    } //clear all inputs

    delete(){
        this.currentOperand = this.currentOperand.slice(0, -1); //from first to second-to-last
    }

    appendNumber(number: number | string): void{
        if(number === '.' && this.currentOperand.includes('.')){ return; } //just allows one period '.'
        this.currentOperand = this.currentOperand + number.toString();
    }

    chooseOperation(operation: string){
        if(this.currentOperand === '') return;
        if(this.previousOperand !== ''){
            this.compute();
        } //because compute comes first, whenever you do another computation it carries on with the last
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let computation: number;
        const prev: number = parseFloat(this.previousOperand);
        const current: number = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)){ return; }
        switch(this.operation){
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
        this.previousOperand  = '';
    }

    updateDisplay(): void{
        this.currentOperandTextElement!.innerHTML = this.currentOperand;
        if(this.operation !== null && this.operation != undefined){
            //console.log((<HTMLElement> this.previousOperandTextElement).innerText);
            (<HTMLElement> this.previousOperandTextElement).innerText = `${this.previousOperand} ${this.operation}`
        }else if(this.operation == undefined){
            //console.log((<HTMLElement> this.previousOperandTextElement).innerText);
            (<HTMLElement> this.previousOperandTextElement).innerText = '';
        }
        //console.log((<HTMLElement> this.previousOperandTextElement).innerText)
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

allClearButton!.addEventListener('click', button =>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton!.addEventListener('click', button =>{
    calculator.delete();
    calculator.updateDisplay();
})