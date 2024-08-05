
import slide1 from "./carousel/1.png?lqip"
import slide2 from "./carousel/2.jpg?lqip"

import wikitrustMobileVideoPlaceholder from "./carousel/WikiTrust-Mobile/cover.jpg?lqip"
import wikitrustMobileVideoH264 from "./carousel/WikiTrust-Mobile/h264.mp4"
import wikitrustMobileVideoHevc from "./carousel/WikiTrust-Mobile/hevc.mp4"
const wikitrustMobileVideo: htmlVideoInfo = {
    ...wikitrustMobileVideoPlaceholder,
    type: "video",
    title: "WikiTrust Mobile ",
    formats: [
        // {
        //     src: wikitrustMobileVideoVp9,
        //     type: 'video/webm codecs=vp9 opus'
        // },
        {
            src: wikitrustMobileVideoH264,
            type: 'video/mp4; codecs=avc1.4D401E,mp4a.40.2'
        },
        {
            src: wikitrustMobileVideoHevc,
            type: 'video/mp4; codecs=hevc,mp4a.40.2'
        },
    ],
}

import wikitrustDesktopVideoPlaceholder from "./carousel/WikiTrust-Desktop/cover.jpg?lqip"
import wikitrustDesktopVideoH264 from "./carousel/WikiTrust-Desktop/h264.mp4"
import wikitrustDesktopVideoHevc from "./carousel/WikiTrust-Desktop/hevc.mp4"
import wikitrustDesktopVideoVp9 from "./carousel/WikiTrust-Desktop/vp9.webm"
const wikitrustDesktopVideo: htmlVideoInfo = {
    ...wikitrustDesktopVideoPlaceholder,
    type: "video",
    title: "WikiTrust Desktop",
    formats: [
        {
            src: wikitrustDesktopVideoVp9,
            type: 'video/webm codecs=vp9 opus'
        },
        {
            src: wikitrustDesktopVideoH264,
            type: 'video/mp4; codecs=avc1.4D401E,mp4a.40.2'
        },
        {
            src: wikitrustDesktopVideoHevc,
            type: 'video/mp4; codecs=hevc,mp4a.40.2'
        },
    ],
}

const imgs = [slide1, slide2].map((lqip) => ({ type: "img", ...lqip }));
const vids = [wikitrustMobileVideo, wikitrustDesktopVideo];
export const _mediaSlides = [imgs, vids].flat();
