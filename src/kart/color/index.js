import color from "color";
import { renderTick } from "./renderTick";

/**
 * @type {Color}
 */
export const red = { color: "red" };
/**
 * @type {Color}
 */
export const yellow = { color: "yellow" };
/**
 * @type {Color}
 */
export const blue = { color: "blue" };

/**
 * @type {Color}
 */
export const green = { color: "rgb(0, 255, 0)" };

const makeSegments = ( c1, c2, length ) =>
    Array( length )
        .fill( 0 )
        .map( ( __, i ) => ({
            color: color( c1.color ).mix( color( c2.color ), i / length )
        }) );

const interstitialCount = 10;
const initialTrack = [ red, yellow, blue ];

const keyMergeColors = initialTrack.map( ( c1, i ) => {
    const c2 = initialTrack[ i + 1 ] ?? initialTrack[ 0 ];
    return color( c1.color ).mix( color( c2.color ), 0.5 );
});

const interstitialsInserted = initialTrack.flatMap( ( c, i ) => [
    color( c.color ),
    keyMergeColors[ i ]
]);

const insertedMerged = interstitialsInserted.flatMap( ( c1, i, arr ) => {
    const c2 = arr[ i + 1 ] ?? arr[ 0 ];
    return makeSegments( c1, c2, interstitialCount );
});

export function addTweenColors( colors, tweenCount = interstitialCount ) {
    return colors
        .flatMap( ( c1, i ) => {
            const c2 = colors[ i + 1 ] ?? colors[ 0 ];
            const mergedKeyColor = {
                color: color( c1.color ).mix( color( c2.color ), 0.5 )
            };
            const seg1 = makeSegments( c1, mergedKeyColor, tweenCount );
            const seg2 = makeSegments( mergedKeyColor, c2, tweenCount );
            return seg1.concat( seg2 ); // by not adding back any of the key colors we can get smoother transitions, maybe
        })
        .map( ( c ) => ({ color: c.color.string() }) );
}

/*
console.groupCollapsed( "Insert" );
renderTick( interstitialsInserted );
renderTick( insertedMerged );
console.log( insertedMerged );
console.groupEnd();

console.group( "Tween" );
const arr = addTweenColors( initialTrack );
renderTick( arr );
console.tap( arr );
console.groupEnd();
*/
