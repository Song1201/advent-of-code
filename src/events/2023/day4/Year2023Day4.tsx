import { range } from 'src/utils/range';
import { sum } from 'src/utils/sum';
import { Year2023Day } from '../day/Year2023Day';

// interface Card {
//     id: number;
//     matchCount: number;
// }

function countMatchForCard(cardStr: string) {
    // const [cardLabel, numbersString] = cardStr.split(':');
    // const id = parseInt(cardLabel.match(/\d+/)![0], 10);
    const [winningNumbersStr, numbersIHaveStr] = cardStr
        .split(':')[1]
        .split('|');
    const winningNumbers = new Set(
        winningNumbersStr
            .match(/\d+/g)!
            .map((numberMatch) => parseInt(numberMatch, 10)),
    );

    const numbersIHave = new Set(
        numbersIHaveStr
            .match(/\d+/g)!
            .map((numberMatch) => parseInt(numberMatch, 10)),
    );

    const matches = [...numbersIHave].filter((number) =>
        winningNumbers.has(number),
    );

    return matches.length;
}

function computeCardPoints(matchCount: number) {
    if (matchCount === 0) return 0;
    return 2 ** (matchCount - 1);
}

function computeCardsPoints(inputText: string) {
    const cardStrings = inputText.split('\n');
    return sum(cardStrings.map(countMatchForCard).map(computeCardPoints));
}

function processCards(inputText: string) {
    const cardStrings = inputText.split('\n');
    const cardCounts: number[] = Array(cardStrings.length).fill(1);

    cardStrings.map(countMatchForCard).forEach((matchCount, cardIdx) => {
        const cardCount = cardCounts[cardIdx];
        range({ length: matchCount, start: cardIdx + 1 }).forEach(
            (copiedCardIdx) => (cardCounts[copiedCardIdx] += cardCount),
        );
    });

    return sum(cardCounts);
}

export function Year2023Day4() {
    return (
        <Year2023Day
            day={4}
            solvePart1={computeCardsPoints}
            solvePart2={processCards}
        />
    );
}
