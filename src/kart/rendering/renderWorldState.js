const renderScale = 1;
const renderSegment = ( seg ) =>
    `background:${seg.color};padding: ${renderScale * 5}px ${
        renderScale * 7
    }px;`; // `background:${color};padding: 5px 7px;` // full box
const renderBody = ( bodies ) =>
    `border: ${renderScale * 3}px dashed; border-color: ${bodies
        .map( ( b ) => b.color )
        .join( " " )};border-radius: 3px`;

export const renderWorldState = ( world ) => {
    const track = world.segments.reduce( ( s ) => s + "%c ", "" ); // can't use join because for the css to work there has to be a space after each '%c' and `.join(' ')` trims the last space
    const colors = world.segments.map( ( s, i ) => {
        let css = renderSegment( s );
        const bodies = world.bodies.filter( ( b ) => b.pos.val === i );
        if ( bodies.length ) css += renderBody( bodies );

        return css;
    });
    console.log(
        track,
        ...colors
        // ...world.bodies.map( pick([ "pos", "moves", "id" ]) )
    );
    console.log( world );
};
