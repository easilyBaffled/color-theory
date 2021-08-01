import color from "color";

const renderScale = 1;

export function playerComponent( player ) {
    return [
        ` %c `,
        Object.entries({
            background:      color( "white" ).mix( color( player.color ) ),
            border:          `${renderScale * 3}px dashed ${player.color}`,
            "border-radius": "3px",
            // "margin-right":  "8px",
            padding:         `${renderScale * 5}px ${renderScale * 7}px`
        })
            .map( ([ k, v ]) => `${k}: ${v};` )
            .join( " " )
    ];
}
