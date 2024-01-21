export default function formatNumber(number) {
    let numberStr = number.toString();
    const dotIndex = numberStr.indexOf(".");

    const integerPart = numberStr.slice(0, dotIndex);
    const decimalPart = numberStr.slice(dotIndex + 1);

    if (decimalPart.length > 5) {
        numberStr = numberStr.slice(0, dotIndex + 5);
    }

    if (decimalPart.startsWith("0000")) {
        return integerPart;
    } else {
        return numberStr.replace(".", ",");
    }
}
