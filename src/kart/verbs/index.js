import { groupBy, isEqual } from "lodash";
import { colorDistance } from "../../utils/colorDistance";
import { normColor } from "../../utils/normalize";
import { moveCard, position, shell } from "../parts";
import { apply, applyShielding } from "../action";
import { renderWorldState } from "../rendering/renderWorldState";
import { BOOST_VAL, MAX_CARDS_PLAYED_PER_TURN, SHIELD_ADD } from "../constants";
import { playAWildCard } from "./playAWildCard";

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

export function spendPlayerCard( player, cardId = player.moves[ 0 ].id ) {
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

export function playAShield( world, player, cardId ) {
    // get card
    const card = spendPlayerCard( player, cardId );
    // add shield value to player shield
    player.shield += SHIELD_ADD;
}

export function playABoost( world, player, cardId ) {
    // get card
    const card = spendPlayerCard( player, cardId );
    // add shield value to player shield
    player.boost = true;
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
    if ( item === "wildCard" ) return playAWildCard( world, player, cardId );
    if ( item === "shield" ) return playAShield( world, player, cardId );
    if ( item === "boost" ) return playABoost( world, player, cardId );

    // player spends a card
    const card = spendPlayerCard( player, cardId );
    // create item
    const newShell = shell({
        color: card.color,
        moves: Array( MAX_CARDS_PLAYED_PER_TURN )
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
    // see the item in the world before it moves
    renderWorldState( world );
    // apply collision?
    moveShell( world, newShell, newShell.moves.length );

    return { action };
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

    const { shield } = body; // need to save the value before it gets reduced, in case there is a `reduce` followed by a `crashed` from one shell

    // apply collision consequence to the player
    actionGroups?.player?.forEach( ( action ) => {
        if ( shield ) applyShielding( action, body );
        else apply( action, body );
    });

    // remove all self-destructing bodies
    actionGroups?.world?.forEach( ( action ) => apply( action, world ) );

    // apply body's collision to remaining bodies
    // get bodies collision actions
    const bodyActions = getBodyColliderActions( body );
    // split actions into player and world
    const bodyActionGroups = splitActionsByTarget( bodyActions );
    // apply actions to all `bodies`
    bodyActionGroups?.player?.forEach( ( action ) =>
        bodies.forEach( ( b ) => apply( action, b ) )
    );
    if ( bodies.length ) {
        // no reason to apply collision (trigger self-destruct) if there was no collision
        // apply actions to the  world
        bodyActionGroups?.world?.forEach( ( action ) => apply( action, world ) );
    }
    // if ( body.isShell && body.crashed ) {
    //     apply(
    //         {
    //             action:   "remove",
    //             property: "bodies",
    //             target:   "world",
    //             value:    body.id
    //         },
    //         world
    //     );
    // }
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
    const score =
        evalPlayerInSeg( seg, player ) +
        evalPlayerInSeg( seg, card ) +
        ( player.boost ? BOOST_VAL : 0 );
    // get consequence from segment -> consequence
    const consequence = getSegmentConsequence( seg, score );

    // apply consequence to player
    apply( consequence, player );

    applyCollisions( world, player );

    return {
        card,
        consequence,
        detailedScore: {
            boost:  player.boost ? BOOST_VAL : 0,
            card:   evalPlayerInSeg( seg, card ),
            player: evalPlayerInSeg( seg, player )
        },
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
