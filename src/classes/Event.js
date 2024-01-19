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
        if(value !== Calculator.lastSymbol || value === "+/-") {
            Calculator.setLastSymbol(value);
            Calculator.start = false;
            
            if (Display.getDomNodeContent() === 0) {
                if(value === "+/-") {
                    Display.changePosNegSign("-"); //todo move this from Event to Calculator
                }else if(value === ",") {
                    Display.updateDisplay(value);
                }
            }else {
                Calculator.processOperator(value);
            }
        }
    }
}
