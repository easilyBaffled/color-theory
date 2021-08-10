import color from "color";
import { moveCard, shell } from "../parts";
import { MAX_CARDS_PLAYED_PER_TURN } from "../constants";
import { apply } from "../action";
import { renderWorldState } from "../rendering/renderWorldState";
import { renderSegment } from "../rendering/renderSegment";
import { spendPlayerCard } from "./index";

/**
 *
 * @param {(Body|Position)} bodyOrPosition
 * @return {number}
 */
const getPosVal = ( bodyOrPosition ) =>
    bodyOrPosition?.pos?.val ?? bodyOrPosition.val;

/**
 *
 * @param {(Base|Color)} body
 * @returns {Color}
 */
const getColor = ( bodyOrColor ) =>
    typeof bodyOrColor === "string" ? bodyOrColor : bodyOrColor.color;

/**
 *
 * @param {(Base|Color)} colorA
 * @param {(Base|Color)} colorB
 * @return {Color}
 */
const mergeColors = ( colorA, colorB ) =>
    color( getColor( colorA ) ).mix( color( getColor( colorB ) ), 0.5 );

/**
 *
 /**
 *
 * @param {World} world
 * @param {Body} player
 * @param {string|number=} cardId
 */
export function playAWildCard( world, player, cardId ) {
    // player spends a card
    const card = spendPlayerCard( player, cardId );
    // get player position for the starting point of change
    const startingPos = getPosVal( player );
    // get card color
    const color = getColor( card );
    // get world segments
    const segments = world.segments.slice( startingPos + 1 );
    // get segment color array
    const colors = segments.map( getColor );
    // create new color array
    const newColors = colors.reduce(
        ( arr, c ) => {
            // console.log(
            //     "%c %c %c ",
            //     ...[
            //         arr[ arr.length - 1 ],
            //         c,
            //         mergeColors( arr[ arr.length - 1 ], c )
            //     ].map( ( c ) => renderSegment({ color: c }) + "margin: 2.5px;" )
            // );
            return arr.concat( mergeColors( arr[ arr.length - 1 ], c ) );
        },
        [ color ]
    );
    // apply color array to world
    segments.forEach( ( seg, i ) => ( seg.color = newColors[ i ]) );

    return { card, world };
}
