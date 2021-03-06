import {
    body,
    buildAddMoveCard,
    buildRemoveMoveCard,
    moveCard,
    position,
    segment,
    shell
} from "./parts";
import { moveShells, playAMove, playAnItem } from "./verbs";
import { addTweenColors, blue, green, red, yellow } from "./color";
import { renderWorldState } from "./rendering/renderWorldState";
import { renderCurrentPlayerUI } from "./render/renderCurrentPlayerUI";
import { BOOST_MAX_CARDS, items, MAX_CARDS_PLAYED_PER_TURN } from "./constants";
import { renderEndOfTurn } from "./rendering/renderEndOfTurn";

/**
 *
 * @type {World}
 */
const world = {
    bodies: [
        body({
            color: "red",
            moves: [ moveCard.avg(), moveCard.avg(), moveCard.avg() ]
        }),
        body({
            color: "yellow",
            moves: [ moveCard.avg(), moveCard.avg(), moveCard.avg() ]
        }),
        shell({
            color: green.color,
            moves: [ moveCard( green ), moveCard( green ), moveCard( green ) ],
            pos:   position({ val: 3 })
        })
    ],
    cardsPlayed: 0,
    segments:    addTweenColors([ red, yellow, blue ], 5 ).map( ( color, i ) =>
        segment({
            color: color.color,
            pos:   position( i ),
            qual:  {
                0:   buildRemoveMoveCard( 1 ),
                0.6: buildAddMoveCard( moveCard( color ) ),
                1:   buildAddMoveCard([ moveCard( color ), moveCard( color ) ])
            }
        })
    )
};

const isTurnOver = ( worldState, player ) => {
    if ( player.crashed ) {
        renderEndOfTurn.crashed( player );
        return true;
    }
    if ( !player.moves.length ) {
        renderEndOfTurn.outOfMoves( player );
        return true;
    }
    if (
        worldState.cardsPlayed >=
        ( player.boost ? BOOST_MAX_CARDS : MAX_CARDS_PLAYED_PER_TURN )
    ) {
        renderEndOfTurn.maxCards( player );
        return true;
    }
};

const resetTurn = ( worldState, player ) => {
    worldState.cardsPlayed = 0;
    player.crashed = false;
    player.boost = false;
    if ( !player.moves.length ) player.moves.push( moveCard.avg() );
};

const getNextPlayerIndex = ( worldState, playerIndex ) => {
    const maxPlayers = worldState.bodies.filter( ( b ) => !b.isShell ).length;
    return maxPlayers === playerIndex + 1 ? 0 : playerIndex + 1;
};

const wireUpPlayerActions = ( worldState, player, playerIndex ) => {
    window.done = () => {
        resetTurn( worldState, player );

        const nextPlayerIndex = getNextPlayerIndex( worldState, playerIndex );
        if ( nextPlayerIndex === 0 ) moveShells( world );
        init( worldState, getNextPlayerIndex( worldState, playerIndex ) );
    };

    player.moves.map( ( card, i ) => {
        const key = String.fromCharCode( i + 97 );
        window[ key ] = ( item ) => {
            const turnDetails = item
                ? playAnItem( worldState, player, card.id, item )
                : playAMove( worldState, player, card.id );
            console.log( turnDetails );
            worldState.cardsPlayed += 1;
            if ( isTurnOver( worldState, player ) ) {
                resetTurn( worldState, player );
                const nextPlayerIndex = getNextPlayerIndex(
                    worldState,
                    playerIndex
                );
                if ( nextPlayerIndex === 0 ) moveShells( world );

                init( worldState, nextPlayerIndex );
            } else init( worldState, playerIndex );
        };

        items.forEach( ( name ) => {
            window[ key ][ name ] = () => window[ key ]( name );
        });
    });
};

function init( worldState, playerIndex = 0 ) {
    const player = worldState.bodies[ playerIndex ];
    // render world UI
    console.log( "Next Move" );
    renderWorldState( worldState );

    // render player UI
    renderCurrentPlayerUI( worldState, player );
    // add player actions (and setup next turn)
    wireUpPlayerActions( worldState, player, playerIndex );
}

init( world );

/**
 * How does a turn end?
 * Right now it goes that each player plays a card and their turn ends.
 * With that I could say the winner is the player with the most cards at the end.
 *
 * But with that you don't get the feeling of having an advantage or disadvantage on part of the track.
 * Which is why I had been thinking you play cards until you run out. But what if the track is really in your favor?
 * Then you may never run out. It's a slightly different story when items get involved but I can't count on that.
 */
// https://github.com/lazorfuzz/liowebrtc/
