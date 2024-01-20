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
            if(Calculator.operators.includes(Calculator.lastSymbol) || Calculator.equalSign.includes(Calculator.lastSymbol)) {
                Display.setDomNodeContent(value);
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
            
            if(!Calculator.start) {
                Calculator.processOperator(value);
            }
        }
    }
    
    static processActionClick(action) {
        if(Calculator.start) {
            Display.setFontToDefault();
        }
        
        if(action === "+/-" || action === "AC") {
            Calculator.processAction(action);
            Calculator.setLastSymbol(action);
        }else {
            if(action !== Calculator.lastSymbol) {
                if (!Calculator.start || action === ",") {
                    Calculator.processAction(action);
                    Calculator.setLastSymbol(action);
                }
            }
        }
        
        Calculator.start = false;
    }
}