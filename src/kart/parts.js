/***************
 *   BUILDERS  *
 ***************/

/**
 *
 * @param {object} param
 * @param {number} val
 *
 * @returns {Position}
 */
export const position = ({ val = 0 } = { val: 0 }) => ({
    val
});

let moveId = 0;
/**
 *
 * @param {Object} param
 * @param {string} param.id
 * @param {string} param.color
 * @return {MoveCard}
 */
export const moveCard = ({ id = moveId++ + "-move", color }) => ({ color, id });

let segId = 0;
/**
 * @param {Object} param
 * @param {string} param.id
 * @param {string} param.color
 * @param {object} param.qual
 * @param {Position} param.pos
 *
 * @returns {Segment}
 *
 * @example
 * segment(0, "red", { 0: -1, 0.5: 0, 1: 1 });
 */
export const segment = ({
    id = segId++ + "-seg",
    color,
    qual,
    pos = position()
}) => ({
    id,
    color,
    qual,
    pos
});

let bodyId = 0;
/**
 *
 * @param {Object} param
 * @param {string} param.id
 * @param {string} param.color
 * @param {MoveCard[]} param.moves
 * @param {Position} param.pos
 *
 * @returns {Body}
 */
export const body = ({
    id = bodyId++ + "-body",
    pos = position(),
    color,
    moves = []
}) => ({
    id,
    pos,
    color,
    moves
});

let shellId = 0;
/**
 * @param {Object} param
 * @param {string|number} param.id
 * @param {Position=} param.pos
 * @param {string} param.color
 * @param {Array.<MoveCard>=} param.moves
 * @return {Shell}
 */
export const shell = ({
    id = shellId++ + "-shell",
    pos = position(),
    color,
    moves = []
}) => ({
    id,
    pos,
    color,
    moves,
    isShell: true
});
