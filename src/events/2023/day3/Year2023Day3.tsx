import { sum } from 'src/utils/sum';
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

interface Part {
    value: number;
    /** row of the first digit of the part */
    row: number;
    /** col of the first digit of the part */
    col: number;
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

function findParts(inputText: string) {
    const lines = parseMatrix(inputText);

    const parts: Part[] = [];
    for (let row = 0; row < lines.length; row++) {
        const line = lines[row];
        for (let col = 0; col < line.length; col++) {
            const numberMatch = line.slice(col).match(/^\d+/);
            if (!numberMatch) continue;

            const numberStr = numberMatch[0];
            if (isPart({ col, row, lines, numberStr })) {
                parts.push({ col, row, value: parseInt(numberStr) });
            }

            col += numberStr.length;
        }
    }
    return parts;
}

function sumPartNumbers(inputText: string) {
    const parts = findParts(inputText);
    return sum(parts.map((part) => part.value));
}

/**
 * @returns locations covered by part digits. `{row: 1, col:2, value: 87} => ['1, 2', '1, 3']`
 */
function getPartCoveredLocations(part: Part) {
    return [...Array(part.value.toString().length).keys()].map(
        (idx) => `${part.row}, ${part.col + idx}`,
    );
}

function makePartsMap(parts: Part[]) {
    return Object.fromEntries(
        parts.flatMap((part) => {
            return getPartCoveredLocations(part).map((location) => [
                location,
                part,
            ]);
        }),
    );
}

function getPartId({ col, row, value }: Part) {
    return `${row}, ${col}, ${value}`;
}

function getPart(id: string) {
    console.log(id.split(', '));
    const [row, col, value] = id
        .split(', ')
        .map((numberStr) => parseInt(numberStr, 10));
    return { row, col, value };
}

function sumGearRatios(inputText: string) {
    const parts = findParts(inputText);
    const partsMap = makePartsMap(parts);

    const lines = parseMatrix(inputText);
    let gearRatiosSum = 0;
    for (let row = 0; row < lines.length; row++) {
        const line = lines[row];
        for (let col = 0; col < line.length; col++) {
            if (line[col] !== '*') continue;
            const adjacentPartIds = new Set(
                [
                    `${row - 1}, ${col - 1}`,
                    `${row - 1}, ${col}`,
                    `${row - 1}, ${col + 1}`,
                    `${row}, ${col - 1}`,
                    `${row}, ${col + 1}`,
                    `${row + 1}, ${col - 1}`,
                    `${row + 1}, ${col}`,
                    `${row + 1}, ${col + 1}`,
                ]
                    .map((adjacent) => partsMap[adjacent])
                    .filter(Boolean)
                    .map(getPartId),
            );
            if (adjacentPartIds.size === 2) {
                const gearAdjacentPartValues = [...adjacentPartIds].map(
                    (partId) => getPart(partId).value,
                );
                gearRatiosSum +=
                    gearAdjacentPartValues[0] * gearAdjacentPartValues[1];
            }
        }
    }

    return gearRatiosSum;
}

export function Year2023Day3() {
    return (
        <Year2023Day
            day={3}
            solvePart1={sumPartNumbers}
            solvePart2={sumGearRatios}
        />
    );
}
