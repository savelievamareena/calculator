import Display from "./Display";

export default class Calculator {
    static regularOperators = ["+", "-", "÷", "×"];
    static specialOperators = ["AC", "+/-", "%"];
    static equalSign = ["="];
    
    static operands = [];
    static lastSymbol = null;
    
    static setLastSymbol(value) {
        this.lastSymbol = value;
    }
    
    static processOperator(operator) {
        this.operands.push(Display.getDomNodeContent());
        
        if(this.regularOperators.includes(operator)) {
            this.operands.push(operator);
        
        } else if(this.specialOperators.includes(operator)) {
            switch (operator) {
                case "AC":
                    this.reset();
                    break;
                case "+/-":
                    Display.changePosNegSign("-");
                    break;
                case "%":
                    this.operands.push(operator);
                    break;
                default:
                    console.log(`Unknown ${operator}.`);
            }
        } else {
            const result = this.calculate(this.operands);
            Display.setDomNodeContent(result);
        }
    }
    
    static reset() {
        this.operands = [];
        this.setLastSymbol(null);
        Display.setDomNodeContent(0);
    }
    
    static calculate() {
        let dataToCalculate = [...this.operands]
        for (let i = 1; i < dataToCalculate.length; i += 2) {
            if (dataToCalculate[i] === "×" || dataToCalculate[i] === "÷") {
                const result = this.operate(dataToCalculate[i - 1], dataToCalculate[i + 1], dataToCalculate[i]);
                dataToCalculate.splice(i - 1, 3, result.toString());
                i -= 2;
            }
        }
        
        while (dataToCalculate.length > 1) {
            const result = this.operate(dataToCalculate[0], dataToCalculate[2], dataToCalculate[1]);
            dataToCalculate.splice(0, 3, result.toString());
        }
        
        return dataToCalculate[0];
    }
    
    static operate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        
        switch (operator) {
            case "+": return a + b;
            case "-": return a - b;
            case "×": return a * b;
            case "÷": return b !== 0 ? a / b : 'Error';
            case "%": return b / 100 * a
            default: return 'Invalid Operator';
        }
    }
}