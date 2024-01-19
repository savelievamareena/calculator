export default function formatNumber(number) {
    let numberStr = number.toString();
    const dotIndex = numberStr.indexOf('.');
    
    const integerPart = numberStr.slice(0, dotIndex);
    const decimalPart = numberStr.slice(dotIndex + 1);
    
    if (decimalPart.startsWith('00') && decimalPart.length > 4) {
        return integerPart;
    } else {
        return numberStr.replace('.', ',');
    }
}