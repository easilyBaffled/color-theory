/**
 * Normalizes a value from one range (current) to another (new).
 *
 * @param  { Number } val    //the current value (part of the current range).
 * @param  { Number } minVal //the min value of the current value range.
 * @param  { Number } maxVal //the max value of the current value range.
 * @param  { Number } newMin //the min value of the new value range.
 * @param  { Number } newMax //the max value of the new value range.
 *
 * @returns { Number } the normalized value.
 */
export const normalizeBetweenTwoRanges = (
    val,
    minVal,
    maxVal,
    newMin,
    newMax
) => {
    return newMin + ((val - minVal) * (newMax - newMin)) / (maxVal - minVal);
};

export const normColorDelta = (v) => normalizeBetweenTwoRanges(v, 0, 765, 0, 1);
export const normColorDist = (v) =>
    normalizeBetweenTwoRanges(v, 0, 441.6729559300637, 0, 1);
export const normColor = normColorDist;
