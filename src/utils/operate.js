export default function operate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    
    let result;
    switch (operator) {
        case "+":
            result = a + b;
            break
        case "-":
            result = a - b;
            break
        case "×":
            result = a * b;
            break
        case "÷":
            result = b !== 0 ? (a / b).toFixed(6) : 'Error'; //parseFloat(",", 6)
            break
        default: result = 'Invalid Operator';
    }
    return result;
}