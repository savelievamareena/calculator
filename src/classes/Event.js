import Calculator from "./Calculator";
import Display from "./Display";

export default class Event {
    static processNumberClick(value) {
        if (Display.domNode.textContent.trim() === "0") {
            Display.setDomNodeContent(value);
        } else {
            if(Calculator.operands.length !== 0) {
                if(isNaN(Calculator.lastSymbol)) {
                    Display.setDomNodeContent(value);
                }
            }else {
                Display.updateDisplayOnInput(value);
            }
        }
        
        Calculator.setLastSymbol(value);
    }
    
    static processOperatorClick(value) {
        if (Display.domNode.textContent.trim() === "0") {
            if(value === "+/-") {
                Display.changePosNegSign("-");
            }
        }else {
            Calculator.processOperator(value);
        }
        
        Calculator.setLastSymbol(value);
    }
}
