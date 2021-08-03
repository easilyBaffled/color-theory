import { groupBy, isEqual } from "lodash";
import { colorDistance } from "../utils/colorDistance";
import { normColor } from "../utils/normalize";
import { moveCard, position, shell } from "./parts";
import { apply } from "./action";
import { renderWorldState } from "./rendering/renderWorldState";

function getNextPosition( world, pos ) {
    return position( world.segments[ pos.val + 1 ] ? pos.val + 1 : 0 );
}

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
 * Get the player's score in the segment
 * the `/2` is to account for the fact that we are also adding the color of the card
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
 /**
 *
 * @param {World} world
 * @param {Body} player
 * @param {string|number=} cardId
 * @param {string} item
 */
export function playAnItem( world, player, cardId, item ) {
    // player spends a card
    const card = spendPlayerCard( player, cardId );
    // create item
    const newShell = shell({
        color: card.color,
        moves: Array( 3 )
            .fill( 0 )
            .map( () => moveCard({ color: card.color }) ),
        pos: getNextPosition( world, player.pos )
    });
    // create add item action
    const action = {
        action:   "add",
        property: "bodies",
        target:   "world",
        value:    newShell
    };
    // apply item to world
    apply( action, world );

    // apply collision?
}

function applyCollisions( world, body ) {
    // COLLISIONS
    // get all colliding bodies in the segment -> bodies
    const bodies = findAllColliders( world, body );

    // get collision event actions from each body -> consequence
    const collisionConsequence = bodies
        .flatMap( getBodyColliderActions )
        .filter( ( v ) => v );

    // separate destroy actions from consequence
    const actionGroups = splitActionsByTarget( collisionConsequence );

    // apply collision consequence to the player
    actionGroups?.player?.forEach( ( action ) => apply( action, body ) );

    // remove all self-destructing bodies
    actionGroups?.world?.forEach( ( action ) => apply( action, world ) );
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

    applyCollisions( world, player );

    return {
        card,
        consequence,
        score,
        seg
    };
}

function getAllShells( world ) {
    return world.bodies.filter( ( body ) => body.isShell );
}

const byId =
    ({ id }) =>
        ( entity ) =>
            entity.id === id;

function isBodyInTheWorld( world, shell ) {
    return !!world.bodies.find( byId( shell ) );
}

function hasMoves( shell ) {
    return shell.moves.length;
}

function moveShell( world, shell, maxMoves ) {
    // if shell is (still) in the world
    if ( !maxMoves || !isBodyInTheWorld( world, shell ) ) return;

    playAMove( world, shell );
    renderWorldState( world );
    moveShell( world, shell, maxMoves - 1 );
}

export function moveShells( world ) {
    // get all shells
    const shells = getAllShells( world );
    // for each shell: moveShell
    shells.forEach( ( shell ) => moveShell( world, shell, shell.moves.length ) );
}
