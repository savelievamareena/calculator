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
                    if(Display.getDomNodeContent() === "-") {
                        Display.setDomNodeContent(0);
                        Calculator.start = true;
                    }else if(Display.getDomNodeContent() !== 0) {
                        Display.setDomNodeContent(Display.getDomNodeContent() * -1)
                    }
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
            Display.updateDisplay(result);
            this.reset();
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
        switch (operator) {
            case "+": return a + b;
            case "-": return a - b;
            case "×": return a * b;
            case "÷": return b !== 0 ? (a / b).toFixed(6) : 'Error'; //parseFloat(",", 6)
            default: return 'Invalid Operator';
        }
    }
}