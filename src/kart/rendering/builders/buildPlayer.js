import { player as playerComponent } from "../components/player";

export const buildPlayer = (player) => {
    const playerTarget = `%c${player.boost ? "🍄" : " "}`;
    const playerStyle = playerComponent(player);
    return [playerTarget, playerStyle];
};
