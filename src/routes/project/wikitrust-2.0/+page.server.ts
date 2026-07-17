
import slide1 from "./carousel/1.png?lqip"
import slide2 from "./carousel/2.jpg?lqip"

import wikitrustMobileVideoPlaceholder from "./carousel/WikiTrust-Mobile/cover.jpg?lqip"
import wikitrustMobileVideoH264High from "./carousel/WikiTrust-Mobile/h264_high.mp4"
// import wikitrustMobileVideoH264 from "./carousel/WikiTrust-Mobile/h264.mp4"
// import wikitrustMobileVideoVp9 from "./carousel/WikiTrust-Mobile/vp9.webm"
// import wikitrustMobileVideoHevc from "./carousel/WikiTrust-Mobile/hevc.mp4"
const wikitrustMobileVideo: htmlVideoInfo = {
    ...wikitrustMobileVideoPlaceholder,
    type: "video",
    title: "WikiTrust on Mobile",
    formats: [
        // {
        //     src: wikitrustMobileVideoHevc,
        //     type: 'video/mp4; codecs=hevc'
        // },
        // {
        //     src: wikitrustMobileVideoVp9,
        //     type: 'video/webm codecs=vp9'
        // },
        {
            src: wikitrustMobileVideoH264High,
            type: 'video/mp4; codecs=avc1.640028'
        },
    ],
}

import wikitrustDesktopVideoPlaceholder from "./carousel/WikiTrust-Desktop/cover.jpg?lqip"
import wikitrustDesktopVideoH264High from "./carousel/WikiTrust-Desktop/h264_high.mp4"
// import wikitrustDesktopVideoH264 from "./carousel/WikiTrust-Desktop/h264.mp4"
// import wikitrustDesktopVideoHevc from "./carousel/WikiTrust-Desktop/hevc.mp4"
// import wikitrustDesktopVideoVp9 from "./carousel/WikiTrust-Desktop/vp9.webm"
const wikitrustDesktopVideo: htmlVideoInfo = {
    ...wikitrustDesktopVideoPlaceholder,
    type: "video",
    title: "Cross-Browser Extension on Desktop",
    formats: [
        // {
        //     src: wikitrustDesktopVideoHevc,
        //     type: 'video/mp4; codecs=hevc'
        // },
        // {
        //     src: wikitrustDesktopVideoVp9,
        //     type: 'video/webm; codecs=vp9'
        // },
        {
            src: wikitrustDesktopVideoH264High,
            type: 'video/mp4; codecs=avc1.640028'
        },
    ],
}

const imgs = [slide1, slide2].map((lqip) => ({ type: "img", ...lqip }));
const vids = [wikitrustMobileVideo, wikitrustDesktopVideo];
export const _mediaSlides = [imgs, vids].flat();
