import { Year2023Day } from '../day/Year2023Day';

function parseMatrix(inputText: string) {
    const lines = inputText.split('\n');
    if (new Set(lines.map((line) => line.length)).size !== 1) {
        throw new Error(
            'Lines have different length, solution might not work!',
        );
    }

    // Pad the matrix(lines) with extra '.' at each edge so we don't need to worry about index out of range when finding symbols to identify parts
    const paddedLines = lines.map((line) => '.' + line + '.');
    const paddedLineLength = paddedLines[0].length;
    paddedLines.unshift('.'.repeat(paddedLineLength));
    paddedLines.push('.'.repeat(paddedLineLength));
    return paddedLines;
}

function isPart({
    col,
    lines,
    row,
    numberStr,
}: {
    lines: string[];
    row: number;
    col: number;
    numberStr: string;
}) {
    // Get the borders around the number;
    const up = lines[row - 1].slice(col - 1, col + numberStr.length + 1);
    const down = lines[row + 1].slice(col - 1, col + numberStr.length + 1);
    const left = lines[row][col - 1];
    const right = lines[row][col + numberStr.length];
    return [...(up + down + left + right)].some(
        (char) => char !== '.' && !char.match(/d/),
    );
}

function sumPartNumbers(inputText: string) {
    const lines = parseMatrix(inputText);

    let sumOfParts = 0;
    for (let row = 0; row < lines.length; row++) {
        const line = lines[row];
        for (let col = 0; col < line.length; col++) {
            const numberMatch = line.slice(col).match(/^\d+/);
            if (!numberMatch) continue;

            const numberStr = numberMatch[0];
            if (isPart({ col, row, lines, numberStr })) {
                sumOfParts += parseInt(numberStr, 10);
            }

            col += numberStr.length;
        }
    }
    return sumOfParts;
}

export function Year2023Day3() {
    return (
        <Year2023Day day={3} solvePart1={sumPartNumbers} solvePart2={() => 0} />
    );
}
