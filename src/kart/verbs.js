import kindof from "kind-of";
import { groupBy, isEqual } from "lodash";
import { colorDistance } from "../utils/colorDistance";
import { normColor } from "../utils/normalize";

// TODO: convert pos into a graph in this case it's a graph that *just* points "up"
/**
 *
 * @param {World} world
 * @param {Body} player
 * @return {Segment}
 */
function movePlayerToNextSegment( world, player ) {
    player.pos.val =
        player.pos.val === world.segments.length - 1 ? 0 : player.pos.val + 1;
    return world.segments[ player.pos.val ];
}

/**
 *
 * @param {Segment} segment
 * @param {Body} player
 * @return {Number}
 */
function evalPlayerInSeg( segment, player ) {
    return ( 1 - normColor( colorDistance( segment.color, player.color ) ) ) / 2;
}

/**
 *
 * @param {Segment} segment
 * @param {number} score
 */
function getSegmentConsequence( segment, score ) {
    const key = Object.keys( segment.qual ).reduce( ( prev, curr ) =>
        Math.abs( curr - score ) < Math.abs( prev - score ) ? curr : prev
    );

    return segment.qual[ key ];
}

function add( target, value ) {
    const map = {
        array:   () => target.concat( value ),
        default: () => value,
        number:  () => target + value
    };

    const func = map[ kindof( target ) ] ?? map.default;
    return func();
}

function remove( target, value ) {
    const map = {
        array: () => {
            const map = {
                number: () => target.slice( value ),
                string: () => target.filter( ( x ) => x.id !== value )
            };
            return map[ kindof( value ) ]();
        },
        default: () => value,
        number:  () => target - value
    };

    const func = map[ kindof( target ) ] ?? map.default;
    return func();
}

export function apply({ action, value, property }, target ) {
    const map = {
        add,
        remove
    };

    target[ property ] = map[ action ]( target[ property ], value );
}

function spendPlayerCard( player, cardId = player.moves[ 0 ].id ) {
    const cardIndex = player.moves.findIndex( ( m ) => m.id === cardId );
    return player.moves.splice( cardIndex, 1 )[ 0 ];
}

function findAllColliders( world, { pos, id }) {
    return world.bodies.filter( ( b ) => b.id !== id && isEqual( b.pos, pos ) );
}

function getBodyColliderActions( body ) {
    return body?.on?.collision;
}

function splitActionsByTarget( actions ) {
    const groups = groupBy( actions, "target" );
    groups.player = groups[ "undefined" ];
    return groups;
}

/**
 *
 * @param {World} world
 * @param {Body} player
 * @param {string|number=} cardId
 */
export function playAMove( world, player, cardId ) {
    // player spends a card
    const card = spendPlayerCard( player, cardId );
    // move player to next segment
    const seg = movePlayerToNextSegment( world, player );

    // evaluate player in segment -> score
    const score = evalPlayerInSeg( seg, player ) + evalPlayerInSeg( seg, card );
    // get consequence from segment -> consequence
    const consequence = getSegmentConsequence( seg, score );

    // apply consequence to player
    apply( consequence, player );

    // COLLISIONS
    // get all colliding bodies in the segment -> bodies
    const bodies = findAllColliders( world, player );

    // get collision event actions from each body -> consequence
    const collisionConsequence = bodies
        .flatMap( getBodyColliderActions )
        .filter( ( v ) => v );

    // separate destroy actions from consequence
    const actionGroups = splitActionsByTarget( collisionConsequence );

    // apply collision consequence to the player
    actionGroups?.player?.forEach( ( action ) => apply( action, player ) );

    // remove all self-destructing bodies
    actionGroups?.world?.forEach( ( action ) => apply( action, world ) );

    return {
        card,
        consequence,
        score,
        seg
    };
}
