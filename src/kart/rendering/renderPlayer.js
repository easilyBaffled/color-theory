import { renderSegment } from "./renderSegment";

export const renderPlayer = ( body ) => {
    let str =
        renderSegment( body ) + " border-radius: 3px; box-sizing: border-box;";
    if ( body.shield ) str += "border-color: white;";
    if ( body.isShell ) str += "border-radius: 15px;";
    return str;
};
