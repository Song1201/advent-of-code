import { useState } from 'react';
import { isEmptyValue } from 'src/utils/isEmptyValue';

const DIGIT_VALUE_MAP = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
} as const;

/**
 * @param digit either word 'one', 'two', ..., 'nine', or digit '1', '2', ..., '9' ,'0'.
 */
function parseStringDigit(digit: string) {
    return digit.length === 1
        ? parseInt(digit, 10)
        : DIGIT_VALUE_MAP[digit as keyof typeof DIGIT_VALUE_MAP];
}

function computeCalibrationValue(input: string) {
    const lines = input.split('\n');
    const calibrationValues = lines.map((line) => {
        const digits: string[] = [];
        for (let i = 0; i < line.length; i++) {
            const digit = line
                .substring(i)
                .match(/^(\d|one|two|three|four|five|six|seven|eight|nine)/);
            if (!digit) continue;
            digits.push(digit[0]);
        }

        if (isEmptyValue(digits)) return 0;

        const firstDigit = parseStringDigit(digits[0]!);
        const lastDigit = parseStringDigit(digits.at(-1)!);
        return firstDigit * 10 + lastDigit;
    });

    return calibrationValues.reduce(
        (sum, currentValue) => sum + currentValue,
        0,
    );
}

export function Year2023Day1() {
    const [inputText, setInputText] = useState('');

    return (
        <div>
            <h1>Year 2023 Day 1</h1>
            <textarea
                value={inputText}
                onChange={(e) => {
                    setInputText(e.target.value);
                }}
            />
            <button
                onClick={() => {
                    console.log(computeCalibrationValue(inputText));
                }}
            >
                Solve Puzzle
            </button>
        </div>
    );
}
