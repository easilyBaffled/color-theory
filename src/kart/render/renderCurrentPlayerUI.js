import { playerComponent } from "../rendering/playerComponent";
import { cardOptionsComponents } from "../rendering/renderCardOptions";
import { MAX_CARDS_PLAYED_PER_TURN } from "../constants";

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
        `\n use ${new Intl.ListFormat( "en", {
            style: "short",
            type:  "disjunction"
        }).format(
            cards.map( ( c ) => c.key + "()" )
        )} and {enter} to play a card or done() and {enter} to end your turn.\n\n`,
        `You have already made ${
            world.cardsPlayed
        } moves this turn you can only make ${
            MAX_CARDS_PLAYED_PER_TURN - world.cardsPlayed
        } more moves this turn.`
    );
};
