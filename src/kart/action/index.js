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
