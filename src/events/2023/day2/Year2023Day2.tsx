import { useState } from 'react';

const CUBES_IN_BAG = {
    blue: 14,
    green: 13,
    red: 12,
} as const;

type Color = 'blue' | 'green' | 'red';

interface CubeGroup {
    blue?: number;
    green?: number;
    red?: number;
}

interface Game {
    id: number;
    cubeGroups: CubeGroup[];
}

/** `1 green, 2 blue, 3 red` => { blue: 2, green: 1, red: 3 } */
function parseCubeGroup(cubeGroupStr: string) {
    const singleColorCubeStrings = cubeGroupStr.split(',');
    const cubeGroup = Object.fromEntries(
        singleColorCubeStrings.map((singleColorCubeStr) => {
            const [numCubes, color] = singleColorCubeStr.trim().split(' ');
            return [color as Color, parseInt(numCubes)];
        }),
    ) as CubeGroup;
    return cubeGroup;
}

function parseGames(inputStr: string) {
    const lines = inputStr.split('\n');
    const games: Game[] = lines.map((line) => {
        const [idHeader, cubeGroupsStr] = line.split(':');
        const id = parseInt(idHeader.slice('Game '.length), 10);
        const cubeGroupStrings = cubeGroupsStr.split(';');
        const cubeGroups = cubeGroupStrings.map(parseCubeGroup);
        return { id, cubeGroups };
    });
    return games;
}

function sumPossibleGameIds(inputStr: string) {
    const games = parseGames(inputStr);

    const possibleGameIds = games
        .filter(({ cubeGroups }) =>
            cubeGroups.every(
                (cubeGroup) =>
                    (!cubeGroup.blue || cubeGroup.blue <= CUBES_IN_BAG.blue) &&
                    (!cubeGroup.red || cubeGroup.red <= CUBES_IN_BAG.red) &&
                    (!cubeGroup.green || cubeGroup.green <= CUBES_IN_BAG.green),
            ),
        )
        .map((game) => game.id);

    return possibleGameIds.reduce((sum, currentValue) => sum + currentValue, 0);
}

function computeNeededCubes({ cubeGroups }: Game): CubeGroup {
    const neededRed = Math.max(...cubeGroups.map(({ red }) => red ?? 0));
    const neededBlue = Math.max(...cubeGroups.map(({ blue }) => blue ?? 0));
    const neededGreen = Math.max(...cubeGroups.map(({ green }) => green ?? 0));
    return { blue: neededBlue, green: neededGreen, red: neededRed };
}

function sumNeededCubePowers(inputStr: string) {
    const games = parseGames(inputStr);
    const neededCubeGroupForGames = games.map(computeNeededCubes);
    const neededCubePowerForGames = neededCubeGroupForGames.map(
        ({ blue, green, red }) => {
            // Remove 0
            return [blue, green, red]
                .filter(Boolean)
                .reduce<number>(
                    (power, currentValue) => power * currentValue!,
                    1,
                );
        },
    );
    return neededCubePowerForGames.reduce(
        (sum, currentValue) => sum + currentValue,
        0,
    );
}

export function Year2023Day2() {
    const [inputText, setInputText] = useState('');

    return (
        <div>
            <h2 className='text-lg'>Day 2</h2>
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
                        console.log(sumPossibleGameIds(inputText));
                    }}
                >
                    Solve Part 1
                </button>
                <button
                    onClick={() => {
                        console.log(sumNeededCubePowers(inputText));
                    }}
                >
                    Solve Part 2
                </button>
            </div>
        </div>
    );
}
