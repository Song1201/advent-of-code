/**
 * range({ length: 3, start: 1 }) => [1, 2, 3]
 */
export function range({
    length,
    start = 0,
}: {
    length: number;
    start?: number;
}) {
    return [...Array(length).keys()].map((i) => i + start);
}
