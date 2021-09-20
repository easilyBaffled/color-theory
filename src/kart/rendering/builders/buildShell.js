import { createTargetList } from "../util";
import { segment } from "../components/segment";
import { shell } from "../components/shell";

export const buildShell = ( s ) => {
    const arr = Array( s.pos.val ).fill( 0 );
    const kartTargets = createTargetList( arr ) + "%c ";
    const kartStyles = arr.map( segment.empty ).concat( shell( s ) );

    return [ kartTargets, kartStyles ];
};
