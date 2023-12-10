export function sum(numbers: number[]) {
    return numbers.reduce((sum, currentNumber) => sum + currentNumber, 0);
}
