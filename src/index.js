import "./index.css";
import Display from "./classes/Display";
import Event from "./classes/Event";

document.addEventListener("DOMContentLoaded", () => {
    const numbers = document.querySelectorAll(".calc_body .number");
    const operators = document.querySelectorAll(".calc_body .operator");
    
    Display.initialize();
    
    numbers.forEach(number => {
        number.addEventListener("click", function() {
            const numValue = number.textContent;
            Event.processNumberClick(numValue);
        });
    });
    
    operators.forEach(operator => {
        operator.addEventListener("click", function() {
            const operatorValue = operator.textContent;
            Event.processOperatorClick(operatorValue);
        });
    })
});