import Display from "./Display";
import formatNumber from "../utils/formatNumber";

export default class Calculator {
    static regularOperators = ["+", "-", "÷", "×"];
    static specialOperators = ["AC", "+/-", "%", ","];
    static equalSign = ["="];
    
    static operands = [];
    static lastSymbol = null;
    static start = true;
    
    static setLastSymbol(value) {
        this.lastSymbol = value;
    }
    
    static processOperator(operator) {
        if(this.regularOperators.includes(operator)) {
            this.operands.push(Display.getDomNodeContent());
            this.operands.push(operator);
            
        } else if(this.specialOperators.includes(operator)) {
            switch (operator) {
                case "AC":
                    this.reset();
                    Display.setFontToDefault();
                    Display.setDomNodeContent(0);
                    break;
                case "+/-":
                    this.switchPosNegSign();
                    break;
                case "%":
                    let percentValue = Display.getDomNodeContent() / 100;
                    Display.updateDisplay(percentValue);
                    break;
                case ",":
                    if(Display.getDomNodeContent() % 1 === 0) {
                        Display.updateDisplay(operator);
                    }
                    break;
                default:
                    throw Error(`Unknown ${operator}.`)
            }
        } else {
            this.operands.push(Display.getDomNodeContent());
            const result = this.calculate(this.operands);
            this.reset();
            Display.updateDisplay(result);
        }
    }
    
    static reset() {
        this.operands = [];
        Calculator.start = true;
    }
    
    static calculate() {
        let dataToCalculate = [...this.operands];
        
        for (let i = 1; i < dataToCalculate.length; i += 2) {
            if (dataToCalculate[i] === "×" || dataToCalculate[i] === "÷") {
                const result = this.operate(dataToCalculate[i - 1], dataToCalculate[i + 1], dataToCalculate[i]);
                dataToCalculate.splice(i - 1, 3, result);
                i -= 2;
            }
        }
        
        while (dataToCalculate.length > 1) {
            const result = this.operate(dataToCalculate[0], dataToCalculate[2], dataToCalculate[1]);
            dataToCalculate.splice(0, 3, result);
        }
        
        return formatNumber(dataToCalculate[0]);
    }
    
    static operate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        
        let result;
        switch (operator) {
            case "+":
                result = a + b;
                break
            case "-":
                result = a - b;
                break
            case "×":
                result = a * b;
                break
            case "÷":
                result = b !== 0 ? (a / b).toFixed(6) : 'Error'; //parseFloat(",", 6)
                break
            default: result = 'Invalid Operator';
        }
        
        return result;
    }
    
    static switchPosNegSign() {
        const currValue = Display.getDomNodeContent();
        if(isNaN(currValue)) {
            Display.setDomNodeContent(0);
            this.start = true;
        }else {
            if(currValue === 0) {
                Display.setDomNodeContent("-");
                this.start = true;
            }else {
                Display.setDomNodeContent(currValue * -1);
            }
        }
    }
}