import color from "color";
import { pick } from "lodash";

const cube = ( color ) => `background:${color};padding: 5px 7px;`; // `background:${color};padding: 5px 7px;` // full box
export const renderTick = ( world, kart = { pos: Infinity }) => {
    const track = world.reduce( ( s ) => s + "%c ", "" ); // can't use join because for the css to work there has to be a space after each '%c' and `.join(' ')` trims the last space
    const colors = world.map( ( s, i ) => {
        let css = cube( color( s.color ).rgb().string() );
        if ( i === kart.pos ) css += "border: 2px solid white;border-radius: 3px";
        return css;
    });
    console.log( track, ...colors, pick( kart, "score", "laps" ) );
};
