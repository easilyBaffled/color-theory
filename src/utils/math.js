export function round(value, decimals = 2) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

export function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
