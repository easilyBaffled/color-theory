import {
    body,
    buildAddMoveCard,
    buildRemoveMoveCard,
    moveCard,
    position,
    segment,
    shell
} from "./parts";
import { playAMove } from "./verbs";
import { addTweenColors, blue, green, red, yellow } from "./color";
import { renderWorldState } from "./rendering/renderWorldState";
import { playerComponent } from "./rendering/playerComponent";
import { cardOptionsComponents } from "./rendering/renderCardOptions";

/**
 *
 * @type {World}
 */
const world = {
    bodies: [
        body({
            color: "red",
            moves: [] // [ moveCard( red ), moveCard( red ), moveCard( red ) ]
        }),
        body({
            color: "yellow",
            moves: [] // [ moveCard( yellow ), moveCard( yellow ), moveCard( yellow ) ]
        }),
        shell({
            color: green.color,
            moves: [ moveCard( green ), moveCard( green ), moveCard( green ) ],
            pos:   position({ val: 2 })
        })
    ],
    segments: addTweenColors([ red, yellow, blue ], 5 ).map( ( color, i ) =>
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

const maxPlayers = world.bodies.filter( ( b ) => !b.isShell ).length;

const renderCurrentPlayerUI = ( world, player ) => {
    const cards = player.moves.map( ( card, i ) => {
        const key = String.fromCharCode( i + 97 );
        return { ...card, key };
    });

    const [ playerTarget, playerCSS ] = playerComponent( player );
    const [ cardOptionsTargets, cardOptionsCSS ] = cardOptionsComponents( cards );

    console.log(
        "%cPlayer" + playerTarget + "%c's cards:" + cardOptionsTargets,
        "",
        playerCSS,
        "",
        ...cardOptionsCSS
    );
};

const wireUpPlayerActions = ( worldState, player, playerIndex ) => {
    player.moves.map( ( card, i ) => {
        const key = String.fromCharCode( i + 97 );
        window[ key ] = () => {
            const turnDetails = playAMove( worldState, player, card.id );
            console.log( turnDetails );
            init(
                worldState,
                maxPlayers === playerIndex + 1 ? 0 : playerIndex + 1
            );
        };
    });
};

function init( worldState, playerIndex = 0 ) {
    const player = worldState.bodies[ playerIndex ];
    if ( !player.moves.length ) player.moves.push( moveCard.avg() );
    // render world UI
    console.log( "" );
    renderWorldState( worldState );

    // render player UI
    renderCurrentPlayerUI( worldState, player );
    // add player actions (and setup next turn)
    wireUpPlayerActions( worldState, player, playerIndex );
}

init( world );
