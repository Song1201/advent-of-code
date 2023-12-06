export function isEmptyValue(value: unknown) {
    if (value === null || value === undefined) {
        return true;
    }

    // Set is object, but Object.keys(nonEmptySet) === [], so we need to deal with Set separately
    if (value instanceof Set) {
        return [...value].length === 0;
    }

    if (value instanceof Error) {
        return false;
    }

    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }

    return false;
}
