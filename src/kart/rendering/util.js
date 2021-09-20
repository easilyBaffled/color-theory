export const createTargetList = (arr) => arr.reduce((s) => s + "%c ", ""); // can't use join because for the css to work there has to be a space after each '%c' and `.join(' ')` trims the last space
