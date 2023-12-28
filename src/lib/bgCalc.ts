import type { Sprite } from "pixi.js";
import { BACKGROUND_FADE_RATE, BG_SPACER_HEIGHT, PERSPECTIVE, WINDOW_SIZE_CHANGED, Z_BACKGROUND, backgroundPixiCanvas } from "./consts";
import { backgrounds as bgImages } from "./assets";
import { addSpriteAsync } from "./pixiUtils";

export const bgScreenspace = (bg: Sprite, zPlane: number, startY: number, offsetY: number, scrollY: number, windowWidth: number, windowHeight: number) => {
    const scale = PERSPECTIVE / (PERSPECTIVE + zPlane);
    const bgWidth = bg.width / bg.scale.x;
    const bgHeight = bg.height / bg.scale.y;
    const neededHeight = windowHeight / bgHeight / scale / 2;
    const bgScale = Math.max(neededHeight, windowWidth / bgWidth);
    const x = windowWidth / 2 - (bgWidth * bgScale) / 2;
    const y = (startY - scrollY) * scale;
    return {
        x, y, scale: bgScale, newY: (bgHeight * bgScale + offsetY) / scale
    }
}

export const calculateBgPositions = (backgrounds: { height: number, width: number }[]) => {
    const scale = PERSPECTIVE / (PERSPECTIVE + Z_BACKGROUND);
    const winWidth = window.innerWidth, winHeight = window.innerHeight;
    let yOffset = 100;
    const output = [];
    for (let i = 0; i < backgrounds.length; i++) {
        const { height, width } = backgrounds[i];
        const neededHeight = winHeight / height / scale / 2;
        const bgScale = Math.max(neededHeight, winWidth / width);
        output.push({
            x: winWidth / 2 - (width * bgScale) / 2,
            yWorld: Number(yOffset),
            scale: bgScale,
            height: height * bgScale
        });
        yOffset += (height * bgScale + BG_SPACER_HEIGHT) / scale;
        // const bgWidth = width / scale
        // const bgHeight = height / scale;
        // const neededHeight = winHeight / (bgHeight * 2 * scale);
        // const bgScale = Math.max(neededHeight, winWidth / bgWidth);
        // Object.assign(backgrounds[i], {
        //     x: winWidth / 2 - (bgWidth * bgScale) / 2,
        //     yWorld: yOffset,
        //     scale: bgScale
        // });
        // yOffset += bgHeight * bgScale;
    }
    return output;
}

const bgSprites = [] as (Sprite | null)[];
let bgDetails = [] as { yWorld: number, x: number, scale: number, height: number }[];
export const updateBackgrounds = (deltaTime: number) => {
    const scrollY = window.scrollY;
    const scaleZ = PERSPECTIVE / (PERSPECTIVE + Z_BACKGROUND);
    const backgrounds = bgImages;
    if (WINDOW_SIZE_CHANGED || bgDetails.length === 0) bgDetails = calculateBgPositions(backgrounds);

    let i = 0
    const bgSplitPoints = [] as number[];
    for (; i < bgDetails.length; i++) {
        const { x, yWorld, scale, height } = bgDetails[i];
        const y = (yWorld - scrollY) * scaleZ;

        bgSplitPoints.push(yWorld);
        if (y + height < 0) {
            const bg = bgSprites[i];
            if (bg) bg.renderable = false;
            continue;
        } else if (y > window.innerHeight) break;



        const bg = bgSprites[i];
        // if (i == 0) console.log(y, bg, backgrounds[i].src);
        if (bg === null) {
            continue;
        } else if (!bg) {
            const backgroundCanvas = backgroundPixiCanvas.get();
            if (!backgroundCanvas) break;
            bgSprites[i] = null;
            //addSpriteSync(backgrounds[i].src, backgroundCanvas, 0, backgrounds[i].width, backgrounds[i].height)
            const newI = Number(i);
            addSpriteAsync(backgrounds[newI].src, backgroundCanvas, 0).then((bg) => {
                bg.alpha = 0;
                bg.zIndex = 0;
                bgSprites[newI] = bg;
            }).catch((e) => {
                console.error(e);
            })
            continue;
        }

        bg.anchor.set(0, 0);
        bg.renderable = true;
        bg.position.set(x / 2, y);
        bg.scale.set(scale);
        if (bg.alpha != 1) bg.alpha = Math.min(bg.alpha + BACKGROUND_FADE_RATE * deltaTime, 1);
    }
    for (; i < bgSprites.length; i++) {
        const bg = bgSprites[i];
        if (bg) bg.renderable = false;
    }
    console.log(bgSplitPoints);

    return bgSplitPoints;
}

// export const updateBackgrounds = (backgroundSprites: Sprite[], deltaTime: number) => {
//     let startY = 0;
//     const scrollY = window.scrollY;
//     const zPlane = Z_BACKGROUND;
//     const scaleZ = PERSPECTIVE / (PERSPECTIVE + zPlane);
//     const scrollScaled = scrollY * scaleZ;

//     const bgSplitPoints = [] as number[];
//     for (let i = 0; i < backgroundSprites.length; i++) {
//         const bg = backgroundSprites[i];
//         const { x, y, scale, newY } = bgScreenspace(bg, zPlane, startY, BG_SPACER_HEIGHT, scrollY, window.innerWidth, window.innerHeight);
//         bg.position.set(x, y);
//         bg.scale.set(scale);
//         if (bg.alpha != 1) bg.alpha = Math.min(bg.alpha + BACKGROUND_FADE_RATE * deltaTime, 1);

//         bg.renderable = true;
//         startY += newY;
//         const startScaled = startY * scaleZ;
//         // if (scrollScaled + window.innerHeight > startScaled + BG_SPACER_CLOUD_HEIGHT && scrollScaled < startScaled + BG_SPACER_CLOUD_HEIGHT) {
//         bgSplitPoints.push(startY);
//         // }
//     }
//     return bgSplitPoints;
// }
// export const bgScreenspace = (bg: Sprite, zPlane: number, startY: number, scrollY: number, windowWidth: number, windowHeight: number) => {
//     const scale = PERSPECTIVE / (PERSPECTIVE + zPlane);
//     const bgWidth = bg.width / bg.scale.x;
//     const bgHeight = bg.height / bg.scale.y;
//     // const neededHeight = Math.max(windowHeight * scale, windowHeight);
//     const bgScale = Math.max(windowHeight / bgHeight, windowWidth / bgWidth);
//     const x = windowWidth / 2;
//     const y = (windowHeight / 2) + (startY - scrollY) * scale;
//     return { x, y, scale: bgScale, newY: bgHeight * bgScale / scale };
// }


// export const updateBackgrounds = (backgroundSprites: Sprite[], blendGradientSprite: Sprite) => {
//     let startY = 0;
//     const scrollY = window.scrollY;
//     const zPlane = 2000;
//     const scale = PERSPECTIVE / (PERSPECTIVE + zPlane);
//     backgroundSprites.forEach((bg, i) => {
//         const { x, y, scale, newY } = bgScreenspace(bg, zPlane, startY, scrollY, window.innerWidth, window.innerHeight);
//         startY += newY;
//         bg.position.set(x, y);
//         bg.scale.set(scale);
//         if (i === 1) {
//             // if (startY - scrollY > 0 && startY - scrollY < window.innerHeight) {
//             blendGradientSprite.position.set(window.innerWidth / 2, (window.innerHeight / 2) + (startY - scrollY) * scale);
//             blendGradientSprite.scale.set(100, 1);
//         }
//     });

// }
