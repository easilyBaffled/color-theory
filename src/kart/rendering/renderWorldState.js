import { renderSegment } from "./renderSegment";
import { renderScale } from "./constants";
import { renderPlayer } from "./renderPlayer";

const renderBody = ( bodies ) =>
    `border: ${renderScale * 3}px dashed; border-color: ${bodies
        .map( ( b ) => b.color )
        .join( " " )};border-radius: 3px`;

export const playerTrackComponent = ( player ) => {
    const arr = Array( player.pos.val ).fill( 0 );
    const targets =
        arr.reduce( ( s ) => s + "%c ", "" ) + "%c" + ( player.boost ? "🍄" : " " );
    const styles = arr
        .map( () => renderSegment({ color: "transparent" }) )
        .concat( renderPlayer( player ) );

    return [ targets, styles ];
};

export const renderWorldState = ( world ) => {
    const track = world.segments.reduce( ( s ) => s + "%c ", "" ); // can't use join because for the css to work there has to be a space after each '%c' and `.join(' ')` trims the last space
    const colors = world.segments.map( renderSegment );

    console.log( track, ...colors );
    world.bodies.forEach( ( b ) => {
        const [ targets, styles ] = playerTrackComponent( b );
        console.log( targets, ...styles );
    });

    console.log( "\n", world );
};
