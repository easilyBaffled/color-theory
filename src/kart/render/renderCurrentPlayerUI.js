import { playerComponent } from "../rendering/playerComponent";
import { cardOptionsComponents } from "../rendering/renderCardOptions";
import {
    BOOST_MAX_CARDS,
    items,
    MAX_CARDS_PLAYED_PER_TURN
} from "../constants";

export const renderCurrentPlayerUI = ( world, player ) => {
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
        ...cardOptionsCSS,
        `\n\n\nUse ${new Intl.ListFormat( "en", {
            style: "short",
            type:  "disjunction"
        }).format(
            cards.map( ( c ) => c.key + "()" )
        )} and <enter> to play a card to move.\n
        To use a card as an item use {cardName}.{itemName}() for example: a.shell() or b.wildCard() <enter>.\n
        Your available items are ${items.join( ", " )}\n
        Or use done() and <enter> to end your turn.\n\n
        You have already made ${
    world.cardsPlayed
} moves this turn you can only make ${
    ( player.boost ? BOOST_MAX_CARDS : MAX_CARDS_PLAYED_PER_TURN ) -
            world.cardsPlayed
} more moves this turn.`.replace( /^( +)/gm, "" )
    );
};
