import { segment } from "../components/segment";
import { createTargetList } from "../util";
import { buildPlayer } from "./buildPlayer";

export const buildKart = ( k ) => {
    const [ playerTarget, playerStyle ] = buildPlayer( k );
    const arr = Array( k.pos.val ).fill( 0 );
    const kartTargets = createTargetList( arr ) + playerTarget;
    const kartStyles = arr.map( segment.empty ).concat( playerStyle );

    return [ kartTargets, kartStyles ];
};
