import color from "color";
/***************
 *   BUILDERS  *
 ***************/

/**
 *
 * @param {({ val: number }|number)} param
 *
 * @returns {Position}
 */
export const position = ( val = 0 ) => {
    if ( typeof val === "number" ) return { val };
    else return val;
};

let moveId = 0;
/**
 *
 * @param {Object|Color} param
 * @param {string=} param.id
 * @param {string} param.color
 * @return {MoveCard}
 */
export const moveCard = ({ id = moveId++ + "-move", color }) => ({ color, id });

moveCard.avg = () =>
    moveCard({ color: color([ 127.5, 127.5, 127.5 ]).rgb().string() });

let segId = 0;
/**
 * @param {Object} param
 * @param {string=} param.id
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
    color,
    id,
    pos,
    qual
});

let bodyId = 0;
/**
 *
 * @param {Object} param
 * @param {string=} param.id
 * @param {string} param.color
 * @param {MoveCard[]} param.moves
 * @param {Position=} param.pos
 *
 * @returns {Body}
 */
export const body = ({
    id = bodyId++ + "-body",
    pos = position(),
    color,
    moves = []
}) => ({
    color,
    id,
    moves,
    pos
});

let shellId = 0;
/**
 * @param {Object} param
 * @param {string|number} param.id
 * @param {Position=} param.pos
 * @param {string|Color} param.color
 * @param {Array.<MoveCard>=} param.moves
 * @return {Shell}
 */
export const shell = ({
    id = shellId++ + "-shell",
    pos = position(),
    color,
    moves = []
}) => ({
    color,
    id,
    isShell: true,
    moves,
    on:      {
        collision: [
            buildRemoveMoveCard( 2 ),
            { action: "add", property: "crashed", value: true },
            { action: "remove", property: "bodies", target: "world", value: id }
        ]
    },
    pos
});
export const buildAddMoveCard = ( value ) => ({
    action:   "add",
    property: "moves",
    value
});
export const buildRemoveMoveCard = ( value ) => ({
    action:   "remove",
    property: "moves",
    value
});
