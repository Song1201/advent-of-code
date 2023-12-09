import { useState } from 'react';

export function Year2023Day({
    day,
    solvePart1,
    solvePart2,
}: {
    day: number;
    solvePart1: (inputText: string) => string | number;
    solvePart2: (inputText: string) => string | number;
}) {
    const [inputText, setInputText] = useState('');
    const [part1Result, setPart1Result] = useState<number | string>();
    const [part2Result, setPart2Result] = useState<number | string>();

    return (
        <div>
            <h2 className='text-lg'>Day {day}</h2>
            <div className='flex gap-x-1'>
                <textarea
                    value={inputText}
                    onChange={(e) => {
                        setInputText(e.target.value);
                    }}
                    className='border-solid border-2'
                />
                <button
                    onClick={() => {
                        setPart1Result(solvePart1(inputText));
                    }}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded h-fit'
                >
                    Solve Part 1
                </button>
                <div>{part1Result}</div>
                <button
                    onClick={() => {
                        setPart2Result(solvePart2(inputText));
                    }}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-1 rounded h-fit'
                >
                    Solve Part 2
                </button>
                <div>{part2Result}</div>
            </div>
        </div>
    );
}
