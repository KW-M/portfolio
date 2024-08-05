import { Assets } from 'pixi.js';
import { browser } from '$app/environment';

import favorites from "../images/icons/categoryIcons/favorite_24dp_000000.svg";
import robotics from "../images/icons/categoryIcons/precision_manufacturing_24dp_000000.svg";
import webDev from "../images/icons/categoryIcons/devices_24dp_000000.svg";
import electronics from "../images/icons/categoryIcons/offline_bolt_24dp_000000.svg";
import graphics from "../images/icons/categoryIcons/view_in_ar_24dp_000000.svg";
import experiments from "../images/icons/categoryIcons/experiments_24dp_000000.svg";
import science from "../images/icons/categoryIcons/biotech_24dp_000000.svg";
import environment from "../images/icons/categoryIcons/energy_savings_leaf_24dp_000000.svg";
export const categoryIcons = { favorites, robotics, electronics, graphics, webDev, experiments, science, environment };


import home from "../images/icons/navIcons/arrow_tl_24dp.svg";
import back from "../images/icons/navIcons/navigate_before_24dp.svg";
import forward from "../images/icons/navIcons/navigate_next_24dp.svg";
import expand from "../images/icons/navIcons/expand_more_24dp.svg";
import fold from "../images/icons/navIcons/unfold_less_24dp.svg";
import unfold from "../images/icons/navIcons/unfold_more_24dp.svg";
import fullscreen from "../images/icons/navIcons/open_in_full_24dp.svg";
import arrowDown from "../images/icons/navIcons/arrow_downward_24dp.svg";
export const navIcons = { home, back, forward, expand, fold, unfold, arrowDown, fullscreen };


import tileCloud from "../images/cloudAssets/Raw Clouds/Artboard2.png?lqip";
export const tileXCloud = tileCloud;

import cloud1p from "../images/cloudAssets/Raw Clouds/Cloud1.png?lqip";
import cloud2p from "../images/cloudAssets/Raw Clouds/Cloud2.png?lqip";
import cloud3p from "../images/cloudAssets/Raw Clouds/Cloud3.png?lqip";
import cloud4p from "../images/cloudAssets/Raw Clouds/Cloud4.png?lqip";
import cloud5p from "../images/cloudAssets/Raw Clouds/cloud5.png?lqip";
import cloud6p from "../images/cloudAssets/Raw Clouds/cloud6.png?lqip";
import cloud7p from "../images/cloudAssets/Raw Clouds/Cloud7.png?lqip";
export const baseClouds = [cloud1p, cloud2p, cloud3p, cloud4p, cloud5p, cloud6p, cloud7p];
export const bigClouds = [cloud1p, cloud2p, cloud3p, cloud4p];

import background1 from "../images/backgrounds/oceanWaves.jpg?lqip";
import background2 from "../images/backgrounds/glacialLake.jpg?lqip";
import background3 from "../images/backgrounds/desertDino.jpg?lqip";
import background4 from "../images/backgrounds/forestCruz.jpg?lqip";
import background5 from "../images/backgrounds/Reflections.jpg?lqip";
import background6 from "../images/backgrounds/granite.jpg?lqip";
import background7 from "../images/backgrounds/lake2.jpg?lqip";
import background8 from "../images/backgrounds/llamaPichu.jpg?lqip";
import background9 from "../images/backgrounds/mistyTrees.jpg?lqip";
import background10 from "../images/backgrounds/cradleMtn.jpg?lqip";
import background11 from "../images/backgrounds/oregon-blur.jpg?lqip";
import background12 from "../images/backgrounds/pisac.jpg?lqip";
import background13 from "../images/backgrounds/seaClifs.jpg?lqip";
import background14 from "../images/backgrounds/sky.jpg?lqip";
import background15 from "../images/backgrounds/shelter.jpg?lqip";
import background16 from "../images/backgrounds/seaClifs2.jpg?lqip";
export const backgrounds = [background1, background2, background3, background4, background5, background6, background7, background8, background9, background10, background11, background12, background13, background14, background15, background16];

// import grahicsExperiments1 from "../images/pageAssets/GraphicsExperiments/1.png?lqip";
// import grahicsExperiments2 from "../images/pageAssets/GraphicsExperiments/2.png?lqip";
// import grahicsExperiments3 from "../images/pageAssets/GraphicsExperiments/3.png?lqip";
// import grahicsExperiments4 from "../images/pageAssets/GraphicsExperiments/4.png?lqip";
// import grahicsExperiments5 from "../images/pageAssets/GraphicsExperiments/5.png?lqip";
// export const graphicsExperiments = [grahicsExperiments1, grahicsExperiments2, grahicsExperiments3, grahicsExperiments4, grahicsExperiments5];

// import wikitrustMobileVideoPlaceholder from "../images/pageAssets/videos/WikiTrust-Mobile/cover.jpg?lqip"
// import wikitrustMobileVideoH264 from "../images/pageAssets/videos/WikiTrust-Mobile/h264.mp4"
// import wikitrustMobileVideoHevc from "../images/pageAssets/videos/WikiTrust-Mobile/hevc.mp4"
// export const wikitrustMobileVideo: htmlVideoInfo = {
//     ...wikitrustMobileVideoPlaceholder,
//     type: "video",
//     title: "WikiTrust Mobile ",
//     formats: [
//         // {
//         //     src: wikitrustMobileVideoVp9,
//         //     type: 'video/webm codecs=vp9 opus'
//         // },
//         {
//             src: wikitrustMobileVideoH264,
//             type: 'video/mp4; codecs=avc1.4D401E,mp4a.40.2'
//         },
//         {
//             src: wikitrustMobileVideoHevc,
//             type: 'video/mp4; codecs=hevc,mp4a.40.2'
//         },
//     ],
// }

// import wikitrustDesktopVideoPlaceholder from "../images/pageAssets/videos/WikiTrust-Desktop/cover.jpg?lqip"
// import wikitrustDesktopVideoH264 from "../images/pageAssets/videos/WikiTrust-Desktop/h264.mp4"
// import wikitrustDesktopVideoHevc from "../images/pageAssets/videos/WikiTrust-Desktop/hevc.mp4"
// import wikitrustDesktopVideoVp9 from "../images/pageAssets/videos/WikiTrust-Desktop/vp9.webm"
// export const wikitrustDesktopVideo: htmlVideoInfo = {
//     ...wikitrustDesktopVideoPlaceholder,
//     type: "video",
//     title: "WikiTrust Desktop",
//     formats: [
//         {
//             src: wikitrustDesktopVideoVp9,
//             type: 'video/webm codecs=vp9 opus'
//         },
//         {
//             src: wikitrustDesktopVideoH264,
//             type: 'video/mp4; codecs=avc1.4D401E,mp4a.40.2'
//         },
//         {
//             src: wikitrustDesktopVideoHevc,
//             type: 'video/mp4; codecs=hevc,mp4a.40.2'
//         },
//     ],
// }


// import Geothermal1 from "../images/pageAssets/Geothermal/1.png?lqip";
// import Geothermal2 from "../images/pageAssets/Geothermal/2.png?lqip";
// import Geothermal3 from "../images/pageAssets/Geothermal/3.png?lqip";
// import Geothermal4 from "../images/pageAssets/Geothermal/4.png?lqip";
// import Geothermal5 from "../images/pageAssets/Geothermal/5.png?lqip";
// export const geothermal = [Geothermal1, Geothermal2, Geothermal3, Geothermal4, Geothermal5];


if (browser) {
    Assets.backgroundLoad(tileXCloud.src);
    // Assets.backgroundLoad(backgrounds.map((b) => b.src));
    Assets.backgroundLoad(baseClouds.map((b) => b.src));
    // Assets.backgroundLoad(Object.values(categoryIcons));
}
