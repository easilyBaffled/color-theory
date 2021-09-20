import { body } from "./body";

export const player = ( b ) => {
    let str = body( b );
    if ( b.shield ) str += "border-color: white;";

    return str;
};
