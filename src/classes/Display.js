export default class Display {
    static domNode = null;
    static styles = null;
    
    static initialize() {
        this.domNode = document.querySelector(".display");
        this.styles = this.domNode.style;
    }
    
    static setDomNodeContent(value) {
        this.domNode.textContent = value;
    }
    
    static updateDomNodeContent(value) {
        this.domNode.textContent += value;
    }
    
    static getDomNodeContent() {
        return this.domNode.textContent;
    }
    
    static updateDisplayOnInput(value) {
        if (this.domNode.textContent.length <= 9) {
            if (this.domNode.textContent.length <= 4) {
                this.styles.fontSize = "8vh";
            }
            
            if (this.domNode.textContent.length > 4 && this.domNode.textContent.length <= 7) {
                this.styles.fontSize = "6vh";
            }
            
            if (this.domNode.textContent.length > 7) {
                this.styles.fontSize = "5vh";
            }
            
            this.updateDomNodeContent(value);
        }
    }
    
    static changePosNegSign(value) {
        this.domNode.textContent = value + this.getDomNodeContent();
    }
}