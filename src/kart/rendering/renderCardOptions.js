export function cardOptionsComponents( cards ) {
    const cardStubs = cards.map( ( c ) => "%c " + c.key ).join( " " ) + " ";
    const cardStyle = cards.map(
        ( c ) =>
            `background:${c.color};padding: 8px 0px; margin: 2px; border-radius: 3px;`
    );
    return [ cardStubs, cardStyle ];
}
