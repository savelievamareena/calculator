import Calculator from "./Calculator";
import Display from "./Display";

export default class Event {
    static processNumberClick(value) { //processing clicks on numbers
        if (Calculator.start) {
            Display.setFontToDefault();
            Display.setDomNodeContent(value);
        }else {
            if (
                Calculator.operators.includes(Calculator.lastSymbol) ||
                Calculator.equalSign.includes(Calculator.lastSymbol)
            ) {
                Display.setFontToDefault();
                Display.setDomNodeContent(value);
            } else {
                Display.updateDisplay(value);
            }
        }

        Calculator.setLastSymbol(value);
        Calculator.start = false;
    }

    static processOperatorClick(value) { //processing clicks on operators: +, -, *, /, =
        if (value !== Calculator.lastSymbol) {
            Calculator.setLastSymbol(value);

            if (!Calculator.start) {
                Calculator.processOperator(value);
            }
        }
    }

    static processActionClick(action) { //processing clicks on actions: %, decimal point, reset (AC) and sign change (+/-)
        if (Calculator.start) {
            Display.setFontToDefault();
        }

        if (action === "+/-" || action === "AC") {
            Calculator.processAction(action);
            Calculator.setLastSymbol(action);
        } else {
            if (action !== Calculator.lastSymbol) {
                if (!Calculator.start || action === ",") {
                    Calculator.processAction(action);
                    if (action !== "%") {
                        Calculator.setLastSymbol(action);
                    }
                }
            }
        }

        if(action !== "AC") {
            Calculator.start = false;
        }
    }

    static resetOperationButton(operators) { //making active operation button (it becomes lighter after click) become regular color again)
        operators.forEach((activeButton) => {
            if (activeButton.classList.contains("active")) {
                activeButton.classList.remove("active");
            }
        });
    }

    static modeSwitch(toggle, rootElement) { // color theme switcher
        rootElement.classList.toggle("light-theme");
    }
}
