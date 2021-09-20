import { createTargetList } from "../util";
import { segment } from "../components/segment";

export const buildTrack = (trackSegments) => {
    const trackTargets = createTargetList(trackSegments);
    const trackStyles = trackSegments.map(segment);
    return [trackTargets, trackStyles];
};
