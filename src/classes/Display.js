import Calculator from "./Calculator";

export default class Display {
    static domNode = null;
    static styles = null;

    static initialize() {
        this.domNode = document.querySelector(".display");
        this.setDomNodeContent(0); //getting rid of spaces around initial value
        this.styles = this.domNode.style;
    }

    static setDomNodeContent(value) {
        this.domNode.textContent = value;
    }

    static updateDomNodeContent(value) {
        this.domNode.textContent += value;
    }

    static getDomNodeContent() {
        if (this.domNode.textContent === "-") {
            return "-";
        } else if (this.domNode.textContent === "0,") {
            return "0";
        } else {
            let result = this.domNode.textContent.replace(",", ".");
            return parseFloat(result);
        }
    }

    static updateDisplay(value) {
        let stringToCheckLength = Calculator.start
            ? value
            : this.domNode.textContent;
        this.updateDisplayFont(stringToCheckLength);

        if (Calculator.lastSymbol === "=") {
            this.setDomNodeContent(value);
        } else {
            if (stringToCheckLength.length <= 9) {
                this.updateDomNodeContent(value);
            }
        }
    }

    static updateDisplayFont(stringToCheckLength) {
        if (stringToCheckLength.length <= 5) {
            this.setFontToDefault();
        }

        if (stringToCheckLength.length > 5) {
            this.styles.fontSize = "5vh";
        }
    }

    static setFontToDefault() {
        this.styles.fontSize = "8vh";
    }
}
