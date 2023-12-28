import { Assets } from 'pixi.js';

// import blendGradient from "$lib/images/cloudAssets/blendGradient.png?lqip";
// export const blendGradientTexture = Texture.from(blendGradient);
// export const blendGradient9SliceArgs = [1, 285, 1, 285];

// export const sprites = await Assets.load('spritesheet.json') as Spritesheet;


import tileCloud from "$lib/images/cloudAssets/Raw Clouds/Artboard2.png?lqip";
export const tileXCloud = tileCloud;

import cloud1p from "$lib/images/cloudAssets/Raw Clouds/Cloud1.png?lqip";
import cloud2p from "$lib/images/cloudAssets/Raw Clouds/Cloud2.png?lqip";
import cloud3p from "$lib/images/cloudAssets/Raw Clouds/Cloud3.png?lqip";
import cloud4p from "$lib/images/cloudAssets/Raw Clouds/Cloud4.png?lqip";
import cloud5p from "$lib/images/cloudAssets/Raw Clouds/cloud5.png?lqip";
import cloud6p from "$lib/images/cloudAssets/Raw Clouds/cloud6.png?lqip";
import cloud7p from "$lib/images/cloudAssets/Raw Clouds/Cloud7.png?lqip";
export const baseClouds = [cloud1p, cloud2p, cloud3p, cloud4p, cloud5p, cloud6p, cloud7p];
export const bigClouds = [cloud1p, cloud2p, cloud3p, cloud4p];


import background1 from "../lib/images/backgrounds/cradleMtn.jpg?lqip";
import background2 from "../lib/images/backgrounds/glacialLake.jpg?lqip";
import background3 from "../lib/images/backgrounds/desertDino.jpg?lqip";
import background4 from "../lib/images/backgrounds/forestCruz.jpg?lqip";
import background5 from "../lib/images/backgrounds/Reflections.jpg?lqip";
import background6 from "../lib/images/backgrounds/granite.jpg?lqip";
import background7 from "../lib/images/backgrounds/lake2.jpg?lqip";
import background8 from "../lib/images/backgrounds/llamaPichu.jpg?lqip";
import background9 from "../lib/images/backgrounds/mistyTrees.jpg?lqip";
import background10 from "../lib/images/backgrounds/oceanWaves.jpg?lqip";
import background11 from "../lib/images/backgrounds/oregon-blur.jpg?lqip";
import background12 from "../lib/images/backgrounds/pisac.jpg?lqip";
export const backgrounds = [background1, background2, background3, background4, background5, background6, background7, background8, background9, background10, background11, background12];

import grahicsExperiments1 from "../lib/pageAssets/GraphicsExperiments/1.png?lqip";
import grahicsExperiments2 from "../lib/pageAssets/GraphicsExperiments/2.png?lqip";
import grahicsExperiments3 from "../lib/pageAssets/GraphicsExperiments/3.png?lqip";
import grahicsExperiments4 from "../lib/pageAssets/GraphicsExperiments/4.png?lqip";
import grahicsExperiments5 from "../lib/pageAssets/GraphicsExperiments/5.png?lqip";
export const graphicsExperiments = [grahicsExperiments1, grahicsExperiments2, grahicsExperiments3, grahicsExperiments4, grahicsExperiments5];

import wikitrustMobileVideoPlaceholder from "../lib/pageAssets/videos/WikiTrust-Mobile/cover.jpg?lqip"
import wikitrustMobileVideoH264 from "../lib/pageAssets/videos/WikiTrust-Mobile/h264.mp4"
import wikitrustMobileVideoHevc from "../lib/pageAssets/videos/WikiTrust-Mobile/hevc.mp4"
export const wikitrustMobileVideo: htmlVideoInfo = {
    placeholder: wikitrustMobileVideoPlaceholder,
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

import wikitrustDesktopVideoPlaceholder from "../lib/pageAssets/videos/WikiTrust-Desktop/cover.jpg?lqip"
import wikitrustDesktopVideoH264 from "../lib/pageAssets/videos/WikiTrust-Desktop/h264.mp4"
import wikitrustDesktopVideoHevc from "../lib/pageAssets/videos/WikiTrust-Desktop/hevc.mp4"
import wikitrustDesktopVideoVp9 from "../lib/pageAssets/videos/WikiTrust-Desktop/vp9.webm"
export const wikitrustDesktopVideo: htmlVideoInfo = {
    placeholder: wikitrustDesktopVideoPlaceholder,
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


import Geothermal1 from "../lib/pageAssets/Geothermal/1.png?lqip";
import Geothermal2 from "../lib/pageAssets/Geothermal/2.png?lqip";
import Geothermal3 from "../lib/pageAssets/Geothermal/3.png?lqip";
import Geothermal4 from "../lib/pageAssets/Geothermal/4.png?lqip";
import Geothermal5 from "../lib/pageAssets/Geothermal/5.png?lqip";
export const geothermal = [Geothermal1, Geothermal2, Geothermal3, Geothermal4, Geothermal5];



Assets.backgroundLoad(tileXCloud.src);
Assets.backgroundLoad(backgrounds.map((b) => b.src));
Assets.backgroundLoad(baseClouds.map((b) => b.src));
