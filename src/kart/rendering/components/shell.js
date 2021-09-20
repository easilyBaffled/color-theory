import { body } from "./body";

export const shell = ( b ) => {
    let str = body( b );
    if ( b.isShell ) str += "border-radius: 15px;";

    return str;
};
