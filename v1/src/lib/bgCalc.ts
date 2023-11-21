import { Container, NineSlicePlane, Sprite } from "pixi.js";
import { PERSPECTIVE } from "./consts";
import { blendGradient9SliceArgs, blendGradientTexture } from "./assets";


export const bgScreenspace = (bg: Sprite, zPlane: number, startY: number, offsetY: number, scrollY: number, screenWidth: number, screenHeight: number) => {
    const scale = PERSPECTIVE / (PERSPECTIVE + zPlane);
    const bgWidth = bg.width / bg.scale.x;
    const bgHeight = bg.height / bg.scale.y;
    const neededHeight = screenHeight / bgHeight / scale / 2;
    const bgScale = Math.max(neededHeight, screenWidth / bgWidth);
    const x = screenWidth / 2 - (bgWidth * bgScale) / 2;
    const y = (startY - scrollY) * scale;
    return {
        x, y, scale: bgScale, newY: (bgHeight * bgScale + offsetY) / scale
    }
}

const bgSplitSprites: NineSlicePlane[] = [];
export const updateBackgrounds = (backgroundSprites: Sprite[], stage: Container) => {
    let startY = 0;
    const scrollY = window.scrollY;
    const zPlane = 2000;
    const scaleZ = PERSPECTIVE / (PERSPECTIVE + zPlane);
    const bgSplitPoints = [];
    const splitSpriteHeight = window.innerHeight;
    const splitSpriteFeatherHeight = 285 * 2;
    for (let i = 0; i < backgroundSprites.length; i++) {
        const bg = backgroundSprites[i];
        const { x, y, scale, newY } = bgScreenspace(bg, zPlane, startY, 500, scrollY, window.innerWidth, window.innerHeight);
        startY += newY;
        bg.position.set(x, y);
        bg.scale.set(scale);
        const scrollStart = (startY - scrollY) * scaleZ;
        if (scrollStart > -splitSpriteHeight + splitSpriteFeatherHeight && scrollStart < window.innerHeight + splitSpriteHeight + splitSpriteFeatherHeight) {
            bgSplitPoints.push(scrollStart);
            //     let splitSprite = bgSplitSprites[i]
            //     if (!splitSprite) {
            //         splitSprite = new NineSlicePlane(blendGradientTexture, ...blendGradient9SliceArgs)
            //         // stage.addChild(splitSprite);
            //         // splitSprite.tint = 0xCFCFCF;
            //         bgSplitSprites[i] = splitSprite;
            //     } else {
            //         bgSplitSprites[i].renderable = true;
            //     }

            //     splitSprite.scale.set(window.innerWidth, 1);
            //     splitSprite.scale.y = 2;
            //     splitSprite.height = splitSpriteHeight / 2 + splitSpriteFeatherHeight;
            //     splitSprite.position.set(0, scrollStart - splitSpriteHeight - splitSpriteFeatherHeight);
        }
        // } else if (bgSplitSprites[i]) {
        //     bgSplitSprites[i].renderable = false;
        // }
    }
    return bgSplitPoints;
}


// export const bgScreenspace = (bg: Sprite, zPlane: number, startY: number, scrollY: number, screenWidth: number, screenHeight: number) => {
//     const scale = PERSPECTIVE / (PERSPECTIVE + zPlane);
//     const bgWidth = bg.width / bg.scale.x;
//     const bgHeight = bg.height / bg.scale.y;
//     // const neededHeight = Math.max(screenHeight * scale, screenHeight);
//     const bgScale = Math.max(screenHeight / bgHeight, screenWidth / bgWidth);
//     const x = screenWidth / 2;
//     const y = (screenHeight / 2) + (startY - scrollY) * scale;
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
