import Display from "./Display";
import formatNumber from "../utils/formatNumber";
import operate from "../utils/operate";

export default class Calculator {
    static operators = ["+", "-", "÷", "×"];
    static equalSign = ["="];

    static operands = [];
    static lastSymbol = "";
    static start = true;

    static setLastSymbol(value) {
        this.lastSymbol = value;
    }

    static processOperator(operator) {
        if (this.operators.includes(operator)) {
            this.operands.push(Display.getDomNodeContent());
            if (this.operators.includes(this.operands[this.operands.length - 1])) {
                this.operands[this.operands.length - 1] = operator; //getting sure only the last of the clicked operators will be assumed
            } else {
                this.operands.push(operator);
            }
        } else {
            this.operands.push(Display.getDomNodeContent());
            const result = this.calculate(this.operands);
            this.reset();
            Display.updateDisplay(result);
        }
    }

    static processAction(action) {
        switch (action) {
        case "AC":
            this.reset();
            Display.setFontToDefault();
            Display.setDomNodeContent(0);
            break;
        case "+/-":
            this.switchPosNegSign();
            break;
        case "%":
            if (!this.operators.includes(this.operands[this.operands.length - 1])) {
                let percentValue = Display.getDomNodeContent() / 100;
                Display.setDomNodeContent(formatNumber(percentValue));
                Calculator.lastSymbol = action;
            }
            break;
        case ",":
            this.processDecimalPoint();
            break;
        default:
            throw Error(`Unknown ${action}.`);
        }
    }

    static calculate() {
        let dataToCalculate = [...this.operands];

        for (let i = 1; i < dataToCalculate.length; i += 2) {
            if (dataToCalculate[i] === "×" || dataToCalculate[i] === "÷") {
                const result = operate(
                    dataToCalculate[i - 1],
                    dataToCalculate[i + 1],
                    dataToCalculate[i],
                );
                dataToCalculate.splice(i - 1, 3, result);
                i -= 2;
            }
        }

        while (dataToCalculate.length > 1) {
            const result = operate(
                dataToCalculate[0],
                dataToCalculate[2],
                dataToCalculate[1],
            );
            dataToCalculate.splice(0, 3, result);
        }

        return formatNumber(dataToCalculate[0]);
    }

    static switchPosNegSign() {
        const currValue = Display.getDomNodeContent();
        if (isNaN(currValue)) {
            Display.setDomNodeContent(0);
            this.start = true;
        } else {
            if (currValue === 0) {
                Display.setDomNodeContent("-");
                this.start = true;
            } else {
                Display.setDomNodeContent(formatNumber(currValue * -1));
            }
        }
    }

    static processDecimalPoint() {
        if (isNaN(Calculator.lastSymbol)) {
            Display.setDomNodeContent("0,");
        } else {
            if (Display.getDomNodeContent() % 1 === 0) {
                Display.updateDisplay(",");
            }
        }
    }

    static reset() {
        this.operands = [];
        Calculator.start = true;
    }
}
