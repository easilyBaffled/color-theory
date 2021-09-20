import { buildKart } from "./builders/buildWorldKart";
import { buildShell } from "./builders/buildShell";
import { buildTrack } from "./builders/buildTrack";

export const renderWorldState = ( world ) => {
    // build track
    const [ trackTargets, trackStyles ] = buildTrack( world.segments );
    // render track
    console.log( trackTargets, ...trackStyles );

    world.bodies.forEach( ( body ) => {
        // build body
        const [ targets, styles ] = body.isShell
            ? buildShell( body )
            : buildKart( body );
        // render body
        console.log( targets, ...styles );
    });

    console.log( "\n", world );
};
