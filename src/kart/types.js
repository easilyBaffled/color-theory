/***************
 * DEFINITIONS *
 ***************/

/**
 * @typedef {string} Color
 */

/**
 * @typedef {Object} Base
 * @property {number|string} id
 * @property {Color} color
 */

/**
 * @typedef {Object} MoveCard
 * @property {Color} color
 */

/**
 * @typedef {Object} Position
 * @property {number} val
 */

/**
 * @typedef {Base} MoveCard
 */

/**
 * @typedef {Base & Object} Segment
 * @property {Object<number, *>} qual
 * @property {Position} pos
 */

/**
 * @typedef {Base & Object} Body
 * @property {MoveCard[]} moves
 * @property {Position} pos
 */

/**
 * @typedef {Body & {isShell: boolean}} Shell
 */

/**
 * @typedef {Base & Object} World
 * @property {Segment} segments
 * @property {Body[]} bodies
 */
