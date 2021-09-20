import { buildPlayer } from "./builders/buildPlayer";

const renderPlayerWithMessage = ( player, message ) => {
    const [ playerTarget, playerStyle ] = buildPlayer( player );
    console.log( playerTarget, playerStyle, message );
};

export const renderEndOfTurn = {
    crashed:  ( player ) => renderPlayerWithMessage( player, "crashed" ),
    maxCards: ( player ) =>
        renderPlayerWithMessage(
            player,
            "made the maximum amount of move this turn."
        ),
    outOfMoves: ( player ) => renderPlayerWithMessage( player, "ran out of moves." )
};
