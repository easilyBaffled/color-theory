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
            moves: [ moveCard( red ), moveCard( red ), moveCard( red ) ]
        }),
        body({
            color: "yellow",
            moves: [ moveCard( yellow ), moveCard( yellow ), moveCard( yellow ) ]
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

function init( worldState, playerIndex = 0, card ) {
    if ( card ) {
        const turnDetails = playAMove(
            world,
            world.bodies[ playerIndex ],
            card.id
        );
        renderWorldState( world );
        console.log( turnDetails );
    }

    const nextPlayerIndex =
        maxPlayers === playerIndex + 1 ? 0 : playerIndex + 1;

    const cards = world.bodies[ playerIndex ].moves.map( ( card, i ) => {
        const key = String.fromCharCode( i + 97 );
        window[ key ] = () => init( world, nextPlayerIndex, card );
        return { ...card, key };
    });

    const [ playerTarget, playerCSS ] = playerComponent(
        world.bodies[ playerIndex ]
    );
    const [ cardOptionsTargets, cardOptionsCSS ] = cardOptionsComponents( cards );

    console.log(
        "%cPlayer" + playerTarget + "%c's cards:" + cardOptionsTargets,
        "",
        playerCSS,
        "",
        ...cardOptionsCSS
    );
}

renderWorldState( world );
init( world );
