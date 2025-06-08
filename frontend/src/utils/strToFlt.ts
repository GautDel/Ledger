export const strToFlt = (input: string|number):number => {
    if (typeof input === "number") return input;
    if (typeof input === "string") {
        const parsed = parseFloat(input);
        return isNaN(parsed) ? 0 : parsed;
    }

    return 0;
}
