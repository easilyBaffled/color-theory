import kindof from "kind-of";

function add( target, value ) {
    const map = {
        array:   () => target.concat( value ),
        default: () => value,
        number:  () => target + value
    };

    const func = map[ kindof( target ) ] ?? map.default;
    return func();
}

function remove( target, value ) {
    const map = {
        array: () => {
            const map = {
                number: () => target.slice( value ),
                string: () => target.filter( ( x ) => x.id !== value )
            };
            return map[ kindof( value ) ]();
        },
        default: () => value,
        number:  () => target - value
    };

    const func = map[ kindof( target ) ] ?? map.default;
    return func();
}

export function apply({ action, value, property }, target ) {
    const map = {
        add,
        remove
    };

    target[ property ] = map[ action ]( target[ property ], value );
}

export function applyShielding({ action, value, property }, target ) {
    // - crashed is nullified
    if ( property !== "crashed" ) {
        // - remove is applied to shield not cards
        apply({ action, property: "shield", value }, target );
        // do a Math.max check to ensure shield is never zero
        target.shield = Math.max( 0, target.shield );
    }
}
