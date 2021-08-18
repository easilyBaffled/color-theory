/***************
 * DEFINITIONS *
 ***************/

/**
 * @typedef {string|{ color: string }} Color
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
 * @typedef {object} Shielded
 * @property {number} shield
 */

/**
 * @typedef {object} Boostable
 * @property {boolean} boost
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
 * @typedef {Base & Shielded & Boostable & Object} Body
 * @property {MoveCard[]} moves
 * @property {Position} pos
 * @property {boolean} crashed
 */

/**
 * @typedef {Body & {isShell: boolean}} Shell
 */

/**
 * @typedef {Base & Object} World
 * @property {Segment} segments
 * @property {Body[]} bodies
 * @property {number} cardsPlayed
 */
