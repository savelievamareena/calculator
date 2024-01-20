import Calculator from "./Calculator";
import Display from "./Display";

export default class Event {
    static processNumberClick(value) {
        if(Calculator.start) {
            Display.setFontToDefault();
        }
        
        if (Display.getDomNodeContent() === 0) {
            Display.setDomNodeContent(value);
        } else {
            if(Calculator.regularOperators.includes(Calculator.lastSymbol) || Calculator.equalSign.includes(Calculator.lastSymbol)) {
                Display.setDomNodeContent(value);
            }else {
                Display.updateDisplay(value);
            }
        }
        
        Calculator.setLastSymbol(value);
        Calculator.start = false;
    }
    
    static processOperatorClick(value) {
        if(value === "+/-") {
            Calculator.processOperator(value);
        }else {
            if(value !== Calculator.lastSymbol) {
                Calculator.setLastSymbol(value);
                
                if (!Calculator.start || value === ",") {
                    Calculator.processOperator(value);
                }
            }
        }
        Calculator.start = false;
    }
}