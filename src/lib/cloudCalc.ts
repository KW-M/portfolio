import type { NineSlicePlane, Sprite } from "pixi.js";
import { PERSPECTIVE } from "./consts";
import { type position3d, bboxIsOffBottom, bboxIsOffLeft, bboxIsOffRight, bboxIsOffTop, getSpriteBbox, screenspaceToWorldspace, worldspaceToScreenspace, parallaxMovmentBetweenLayers } from "./3dCalc";

interface cloudDetails {
    startPos: position3d;
    originalWidth: number;
    originalHeight: number;
    alpha: number;
    scaling: number;
    speedX: number;
    cloudSprite: Sprite;
    debugRect?: NineSlicePlane;
}

interface coverCloudDetails extends cloudDetails {
    currentSplitIndex: number;
}

export const clouds: cloudDetails[] = [];
export const coverClouds: coverCloudDetails[] = [];

export const addCloud = (cloudSprite: Sprite, x: number = 0, y: number = 0, z: number = 0, scale: number, alpha: number, debugRect: NineSlicePlane, globalScaling: number) => {
    const cloud: cloudDetails = {
        startPos: {
            x: x,
            y: y,
            z: z,
        },
        originalWidth: cloudSprite.width,
        originalHeight: cloudSprite.height,
        alpha: alpha,
        scaling: scale,
        speedX: 3,
        cloudSprite: cloudSprite,
        debugRect: debugRect,
    };
    clouds.push(cloud);
};

export const addCoverCloud = (cloudSprite: Sprite, x: number = 0, y: number = 0, z: number = 0, scale: number, alpha: number, debugRect: NineSlicePlane, globalScaling: number) => {
    const cloud: coverCloudDetails = {
        startPos: {
            x: x,
            y: y,
            z: z,
        },
        currentSplitIndex: 0,
        originalWidth: cloudSprite.width,
        originalHeight: cloudSprite.height,
        alpha: alpha,
        scaling: scale,
        speedX: 0.1,
        cloudSprite: cloudSprite,
        debugRect: debugRect,
    };
    coverClouds.push(cloud);
};

export const greyscaleTintSprite = (cloudSprite: Sprite, value: number) => {
    const tint = (value << 16) + (value << 8) + value;
    cloudSprite.tint = tint;
}

export const calculateCloudPosition3d = (cloud: cloudDetails, timeElapsed: number, scrollY: number, screenWidth: number, screenHeight: number, globalScaling: number) => {
    const startPos = cloud.startPos;
    const z = startPos.z;
    const pScale = PERSPECTIVE / (PERSPECTIVE + z);
    const cloudWidth = cloud.originalWidth * cloud.scaling * globalScaling;
    const cloudHeight = cloud.originalHeight * cloud.scaling * globalScaling;
    const depthScreenHeight = screenHeight / pScale;
    const depthScreenWidth = screenWidth / pScale;
    const x = (startPos.x + timeElapsed * cloud.speedX) % (depthScreenWidth + cloudWidth) - cloudWidth;
    const yWrap = depthScreenHeight + cloudHeight;
    const startY = (startPos.y + cloudHeight) % yWrap - cloudHeight * 2;
    const y = -Math.floor((startY - scrollY + cloudHeight) / yWrap) * yWrap + startY //- depthCloudHeight + 20;
    return { x, y, z };
}

export const calculateXtileCloudPosition = (cloud: cloudDetails, timeElapsed: number, scrollY: number, splitPoint: number, screenWidth: number, screenHeight: number, globalScaling: number) => {
    const startPos = cloud.startPos;
    const z = startPos.z;
    const pScale = PERSPECTIVE / (PERSPECTIVE + z);
    const cloudWidth = screenWidth;
    const cloudHeight = cloud.originalHeight * cloud.scaling * globalScaling;
    // const depthScreenHeight = screenHeight / pScale;
    // const depthScreenWidth = screenWidth / pScale;
    const x = (startPos.x + timeElapsed * cloud.speedX) % screenWidth;
    const startY = (startPos.y + cloudHeight) % screenHeight - cloudHeight * 2;
    const y = (startY - scrollY) * pScale;
    return { x, y, z, width: cloudWidth, height: cloudHeight };
}

// export const calculateCoverCloudPosition3d = (cloud: coverCloudDetails, timeElapsed: number, scrollY: number, screenWidth: number, screenHeight: number, splitPoints: number[]) => {
//     const startPos = cloud.startPos;
//     const z = startPos.z;
//     const pScale = PERSPECTIVE / (PERSPECTIVE + z);
//     const depthCloudWidth = cloud.originalWidth
//     const depthCloudHeight = cloud.originalHeight
//     const depthScreenHeight = screenHeight / pScale;
//     const depthScreenWidth = screenWidth / pScale;
//     const x = (startPos.x + timeElapsed * cloud.speedX) % (depthScreenWidth + depthCloudWidth) - depthCloudWidth;
//     // const offset = parallaxMovmentBetweenLayers(2000, z, splitPoints[cloud.currentSplitIndex])
//     let y = startPos.y + splitPoints[cloud.currentSplitIndex] - scrollY;
//     // const bbox = getSpriteBbox(x, y, 1, cloud.cloudSprite);
//     // if (bboxIsOffTop(bbox)) {
//     //     cloud.currentSplitIndex = Math.min(cloud.currentSplitIndex + 1, splitPoints.length - 1);
//     //     y = startPos.y + splitPoints[cloud.currentSplitIndex] - scrollY;
//     // } else if (bboxIsOffBottom(bbox, screenHeight)) {
//     //     cloud.currentSplitIndex = Math.min(cloud.currentSplitIndex - 1, 0);
//     //     y = startPos.y + splitPoints[cloud.currentSplitIndex] - scrollY;
//     // }

//     return { x, y, z };
// }


export const placeUniformCloud = (width: number, height: number, z: number, screenWidth: number, ySpacing: number, xSpacing: number, startY: number, cumulativeCloudWidth: number) => {
    const startX = cumulativeCloudWidth + xSpacing;
    const pScale = PERSPECTIVE / (PERSPECTIVE + z);
    const depthScreenWidth = screenWidth / pScale;
    const wrap = depthScreenWidth + width;
    const x = startX % wrap - width;
    const y = startY + Math.floor((startX - width) / (wrap)) * ySpacing;
    return { x, y, z };
}


export const placeSplitpointCloud = (splitPoints: number[], splitPointHeight: number, backgroundZ: number, cloudZ: number) => {
    const scale1 = PERSPECTIVE / (PERSPECTIVE + backgroundZ);
    const scale2 = PERSPECTIVE / (PERSPECTIVE + cloudZ);

    const splitPointStart = splitPoints[0] - splitPointHeight;
    const splitPointEnd = splitPoints[0];

    const startY = splitPointEnd * scale1 / scale2
    // const startY = parallaxMovmentBetweenLayers(backgroundZ, cloudZ, splitPointEnd);
    // const endY = parallaxMovmentBetweenLayers(backgroundZ, cloudZ, splitPointEnd);
    console.log(`placing cloud at ${0},${startY},${cloudZ} <= ${0},${splitPointStart},${backgroundZ}`, splitPoints)
    return { x: 0, y: startY, z: cloudZ };
}

// export const placeCloud = (cloud: cloudDetails, screenX: number, screenY: number, scrollY: number) => {
//     const { x, y, z } = screenspaceToWorldspace({ x: screenX, y: screenY, z: cloud.z }, scrollY);
//     console.log(`placing cloud at ${x},${y},${z} <= ${screenX},${screenY}`)
//     cloud.x = x;
//     cloud.y = y;
// }


// export const placeCloudX = (cloud: cloudDetails, scrollY: number, screenWidth: number, screenHeight: number) => {
//     const screenX = -cloud.cloudSprite.width / 2 + 1;
//     const screenY = Math.random() * screenHeight;
//     placeCloud(cloud, screenX, screenY, scrollY);
//     return { screenX, screenY };
// }


// export const placeCloudTop = (cloud: cloudDetails, screenX: number, scrollY: number, screenWidth: number, screenHeight: number) => {
//     // const screenX = Math.random() * screenWidth;
//     const screenY = 0 - cloud.cloudSprite.height / 2 + 10;
//     placeCloud(cloud, screenX, screenY, scrollY);
//     return { screenX, screenY };
// }

// export const placeCloudBottom = (cloud: cloudDetails, screenX: number, scrollY: number, screenWidth: number, screenHeight: number) => {
//     // screenX = Math.random() * screenWidth;
//     const screenY = screenHeight + cloud.cloudSprite.height / 2 - 10;
//     placeCloud(cloud, screenX, screenY, scrollY);
//     return { x: screenX, y: screenY };
// }

let sumTime = 0;
export const updateClouds = (deltaTime: number, bgSplitPoints: number[], globalScaling: number) => {
    sumTime += deltaTime;
    const scrollY = window.scrollY;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    for (let i = 0; i < clouds.length; i++) {
        const cloud = clouds[i];
        const pos3d = calculateCloudPosition3d(cloud, sumTime, scrollY, screenWidth, screenHeight, globalScaling);
        // const pos3d = { x: cloud.startPos.x, y: cloud.startPos.y, z: cloud.startPos.z }
        const { x, y, scale } = worldspaceToScreenspace(pos3d, scrollY);
        const trueScale = scale * cloud.scaling * globalScaling;
        const bbox = getSpriteBbox(x, y, trueScale, cloud.cloudSprite)
        if (cloud.debugRect) {
            cloud.debugRect.position.set(bbox.left, bbox.top);
            cloud.debugRect.width = (bbox.right - bbox.left) || 0;
            cloud.debugRect.height = (bbox.bottom - bbox.top) || 0;
        }

        const faderate = 0.001 * cloud.speedX;
        let alpha = cloud.cloudSprite.alpha;
        const leftBound = window.innerWidth * (2 / 5);
        const rightBound = window.innerWidth * (2 / 5)
        const topBound = window.innerHeight / 3;
        const bottomBound = window.innerHeight * 2 / 3;


        const cloudCenterX = (bbox.left + bbox.right) / 2;
        const cloudCenterY = (bbox.top + bbox.bottom) / 2;
        // const leftBound = window.innerWidth * (0 / 4);
        // const rightBound = window.innerWidth * (4 / 4)
        // const topBound = window.innerHeight / 3;
        // const bottomBound = window.innerHeight * 2 / 3;

        // if (bbox.right < leftBound || bbox.left > rightBound || bbox.bottom < topBound || bbox.top > bottomBound) {
        if (cloudCenterX < 0 || cloudCenterX > screenWidth || cloudCenterY < topBound || cloudCenterY > bottomBound) {
            alpha += faderate;
        } else if (bbox.right > leftBound && bbox.left < rightBound && bbox.bottom > topBound && bbox.top < bottomBound) {
            alpha -= faderate;
        } else {
            alpha -= faderate;
        }
        alpha = Math.min(Math.max(alpha, 0), 1);
        // const distFromCenter = Math.pow(Math.pow(x - screenWidth / 2, 2) + Math.pow(y - screenHeight / 2, 2), 0.5);
        // const ramp = 2;
        // const distFromCenter = Math.pow(Math.abs(x - screenWidth / 2) + Math.abs(y - screenHeight / 2), ramp);
        // alpha += distFromCenter / Math.pow(screenWidth + screenHeight, ramp) * 100;
        // cloud.cloudSprite.alpha = alpha;
        // cloud.cloudSprite.renderable = false;

        // alpha *= Math.max(
        //     Math.max((x - screenWidth), (0 - x)) / screenWidth,
        //     // Math.max((y - screenHeight), (0 - y)) / screenHeight
        //     0
        // ) * 3 // + (Math.sin(scrollY / 1000) + 1);

        cloud.cloudSprite.x = x;
        cloud.cloudSprite.y = y;

        if (alpha > 0) {
            cloud.cloudSprite.x = x;
            cloud.cloudSprite.y = y;
            cloud.cloudSprite.alpha = alpha;
            cloud.cloudSprite.scale.set(trueScale);
            cloud.cloudSprite.renderable = true;
        } else {
            cloud.cloudSprite.renderable = false;
        }
    }

    for (let i = 0; i < bgSplitPoints.length; i++) {
        const cloudTop = coverClouds[2 * i];
        const cloudBottom = coverClouds[2 * i + 1];


        // const pos3d = calculateCloudPosition3d(cloud, sumTime, scrollY, screenWidth, screenHeight, globalScaling);
        const yStart = calcOffsetBetweenLayers(bgSplitPoint[1], window.innerHeight + 250, window.innerHeight, 2000, 1000);
        const yEnd = calcOffsetBetweenLayers(bgSplitPoint[1], -50, 0, 2000, 1000);

        // const { x, y, scale } = worldspaceToScreenspace(pos3d, scrollY);
        // const trueScale = scale * cloud.scaling * globalScaling;
        // const bbox = getSpriteBbox(x, y, trueScale, cloud.cloudSprite)
        // if (cloud.debugRect) {
        //     cloud.debugRect.position.set(bbox.left, bbox.top);
        //     cloud.debugRect.width = (bbox.right - bbox.left) || 0;
        //     cloud.debugRect.height = (bbox.bottom - bbox.top) || 0;
        // }
        // let alpha = 0.0;
        // const smoothing = 300;
        // for (let j = 0; j < bgSplitPoints.length; j++) {
        //     const splitPointStart = bgSplitPoints[j] - 450;
        //     const splitPointEnd = bgSplitPoints[j];
        //     alpha += Math.max(0, Math.min(y - splitPointStart + smoothing, smoothing) * Math.min(splitPointEnd - y + smoothing, smoothing) / smoothing / smoothing)
        // }
        // if (alpha > 0) {
        //     cloud.cloudSprite.x = x;
        //     cloud.cloudSprite.y = y;
        //     cloud.cloudSprite.alpha = alpha;
        //     cloud.cloudSprite.scale.set(trueScale);
        //     cloud.cloudSprite.renderable = true;
        // } else {
        //     cloud.cloudSprite.renderable = false;
        // }
    }

    // for (let i = 0; i < coverClouds.length; i++) {
    //     const cloud = coverClouds[i];
    //     const pos3d = calculateCoverCloudPosition3d(cloud, sumTime, scrollY, screenWidth, screenHeight, bgSplitPoints);
    //     const { x, y, scale } = worldspaceToScreenspace(pos3d, scrollY);
    //     const bbox = getSpriteBbox(x, y, scale * cloud.scaling, cloud.cloudSprite)
    //     if (cloud.debugRect) {
    //         cloud.debugRect.position.set(bbox.left, bbox.top);
    //         cloud.debugRect.width = (bbox.right - bbox.left) || 0;
    //         cloud.debugRect.height = (bbox.bottom - bbox.top) || 0;
    //     }

    //     cloud.cloudSprite.x = x;
    //     cloud.cloudSprite.y = y;
    //     cloud.cloudSprite.alpha = 0.6;
    //     cloud.cloudSprite.scale.set(scale * cloud.scaling * globalScaling);
    // }
};
