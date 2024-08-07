
import Img1 from "./carousel/1.png?lqip";
import Img2 from "./carousel/2.png?lqip";
import Img3 from "./carousel/3.png?lqip";
import Img4 from "./carousel/4.png?lqip";
import Img5 from "./carousel/5.png?lqip";

import sdfVideoPlaceholder from "./carousel/SDF_Graphics_Demo/cover.png?lqip"
import sdfVideoH264 from "./carousel/SDF_Graphics_Demo/h264.mp4"
import sdfVideoHevc from "./carousel/SDF_Graphics_Demo/hevc.mp4"
import sdfVideoVp9 from "./carousel/SDF_Graphics_Demo/vp9.webm"
const sdfVideo: htmlVideoInfo = {
    ...sdfVideoPlaceholder,
    type: "video",
    title: "WikiTrust Mobile ",
    formats: [
        {
            src: sdfVideoVp9,
            type: 'video/webm codecs=vp9 opus'
        },
        {
            src: sdfVideoH264,
            type: 'video/mp4; codecs=avc1.4D401E,mp4a.40.2'
        },
        {
            src: sdfVideoHevc,
            type: 'video/mp4; codecs=hevc,mp4a.40.2'
        },
    ],
}


const imgs = [Img1, Img2, Img3, Img4, Img5].map((lqip) => ({ type: "img", ...lqip }));
const vids = [sdfVideo];
export const _mediaSlides = [vids, imgs].flat();
