import Calculator from "./Calculator";
import Display from "./Display";

export default class Event {
    static processNumberClick(value) {
        const prevSymbol = Calculator.lastSymbol;
        
        if (Display.getDomNodeContent() === 0) {
            Display.setDomNodeContent(value);
        } else {
            if(Calculator.operands.length !== 0) {
                if(isNaN(prevSymbol)) {
                    Display.setDomNodeContent(value);
                }else {
                    Display.updateDisplay(value);
                }
            }else {
                Display.updateDisplay(value);
            }
        }
        
        Calculator.setLastSymbol(value);
        Calculator.start = false;
    }
    
    static processOperatorClick(value) {
        if(value !== Calculator.lastSymbol) {
            Calculator.setLastSymbol(value);
            
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
        Calculator.start = false;
    }
}
