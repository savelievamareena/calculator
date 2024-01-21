import "./index.css";
import Display from "./classes/Display";
import Event from "./classes/Event";

document.addEventListener("DOMContentLoaded", () => {
    const numbers = document.querySelectorAll(".calc_body .number");
    const operators = document.querySelectorAll(".calc_body .operator");
    const actions = document.querySelectorAll(".calc_body .action");
    
    const toggle = document.querySelector("#toggle");
    let rootElement = document.body;
    
    Display.initialize();
    
    numbers.forEach(number => {
        number.addEventListener("click", function() {
            const numValue = number.dataset.key;
            Event.processNumberClick(numValue);
        });
    });
    
    operators.forEach(operator => {
        operator.addEventListener("click", function() {
            const operatorValue = operator.dataset.key;
            Event.processOperatorClick(operatorValue);
        });
    });
    
    actions.forEach(action => {
        action.addEventListener("click", function() {
            const operatorValue = action.dataset.key;
            Event.processActionClick(operatorValue);
        });
    })
    
    toggle.addEventListener("click", function() {
        Event.modeSwitch(toggle, rootElement);
    });
});