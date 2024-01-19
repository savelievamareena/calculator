export default function formatNumber(number) {
    let numberStr = number.toFixed(5);
    const dotIndex = numberStr.indexOf('.');
    
    const integerPart = numberStr.slice(0, dotIndex);
    const decimalPart = numberStr.slice(dotIndex + 1);
    
    if (decimalPart.startsWith('0000')) {
        return integerPart;
    } else {
        return numberStr.replace('.', ',');
    }
}