import { renderScale } from "./utils";

export const segment = ( seg ) =>
    `background:${seg.color};
    border: 2px solid ${seg.color};
    padding: ${renderScale * 5}px ${renderScale * 7}px;`;

segment.empty = () => segment({ color: "transparent" });
