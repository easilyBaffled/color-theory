import { body, moveCard, position, segment } from "./parts";
import { apply, playAMove } from "./verbs";

const buildAddMoveCard = (value) => ({
    action: "add",
    value,
    property: "moves"
});

const buildRemoveMoveCard = (value) => ({
    action: "remove",
    value,
    property: "moves"
});

/**
 *
 * @type {World}
 */
const world = {
    segments: [
        {
            color: "red",
            qual: {
                0: buildRemoveMoveCard(1),
                0.5: buildAddMoveCard(moveCard("red")),
                1: buildAddMoveCard(moveCard("red"), moveCard("red"))
            }
        },
        {
            color: "blue",
            qual: {
                0: buildRemoveMoveCard(1),
                0.5: buildAddMoveCard(moveCard("blue")),
                1: buildAddMoveCard(moveCard("blue"), moveCard("blue"))
            }
        },
        {
            color: "yellow",
            qual: {
                0: buildRemoveMoveCard(1),
                0.5: buildAddMoveCard(moveCard("yellow")),
                1: buildAddMoveCard(moveCard("yellow"), moveCard("yellow"))
            }
        }
    ].map((o, i) => segment({ ...o, pos: position(i) })),
    bodies: [
        body({
            id: "0-player",
            color: "red",
            moves: [moveCard("red"), moveCard("red"), moveCard("red")]
        })
    ]
};

apply(buildRemoveMoveCard(1), world.bodies[0]);
playAMove(world, world.bodies[0]);
apply(buildRemoveMoveCard(1), world.bodies[0]);
playAMove(world, world.bodies[0]);
console.log(world);
