import { renderScale } from "./constants";

export const renderSegment = ( seg ) =>
    `background:${seg.color}; border: 2px solid ${seg.color}; padding: ${
        renderScale * 5
    }px ${renderScale * 7}px;`; // `background:${color};padding: 5px 7px;` // full box
