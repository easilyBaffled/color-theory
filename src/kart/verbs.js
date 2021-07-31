import kindof from "kind-of";
import { colorDistance } from "../utils/colorDistance";
import { normColor } from "../utils/normalize";

/**
 *
 * @param {World} world
 * @param {Body} player
 * @return {Segment}
 */
function movePlayerToNextSegment(world, player) {
    player.pos.val =
        player.pos.val === world.segments.length - 1 ? 0 : (player.pos.val = 1);
    return world.segments[player.pos.val];
}

/**
 *
 * @param {Segment} segment
 * @param {Body} player
 * @return {Number}
 */
function evalPlayerInSeg(segment, player) {
    return normColor(colorDistance(segment.color, player.color));
}

/**
 *
 * @param {Segment} segment
 * @param {number} score
 */
function getSegmentConsequence(segment, score) {
    const key = Object.keys(segment.qual).reduce((prev, curr) =>
        Math.abs(curr - score) < Math.abs(prev - score) ? curr : prev
    );

    return segment.qual[key];
}

function add(target, value) {
    const map = {
        array: () => target.concat(value),
        number: () => target + value,
        default: () => value
    };

    const func = map[kindof(target)] ?? map.default;
    return func();
}

function remove(target, value) {
    const map = {
        array: () => target.slice(value),
        number: () => target - value,
        default: () => value
    };

    const func = map[kindof(target)] ?? map.default;
    return func();
}

export function apply({ action, value, property }, target) {
    const map = {
        remove,
        add
    };

    target[property] = map[action](target[property], value);
}

function spendPlayerCard(player, cardId) {
    player.moves;
}

/**
 *
 * @param {World} world
 * @param {Body} player
 * @param {string|number} cardId?
 */
export function playAMove(world, player, cardId) {
    // player spends a card
    const card = spendPlayerCard(player, cardId);
    // move player to next segment
    const seg = movePlayerToNextSegment(world, player);

    // evaluate player in segment -> score
    const score = evalPlayerInSeg(seg, player);

    // get consequence from segment -> consequence
    const consequence = getSegmentConsequence(seg, score);

    // apply consequence to player
    apply(consequence, player);
}
