import { renderSegment } from "./renderSegment";

export const renderPlayer = ( player ) => {
    let str =
        renderSegment( player ) + " border-radius: 3px; box-sizing: border-box;";
    if ( player.shield ) str += "border-color: white;";
    return str;
};
