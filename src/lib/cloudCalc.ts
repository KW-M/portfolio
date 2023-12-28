import { type NineSlicePlane, Sprite, TilingSprite, Texture } from "pixi.js";
import { BG_DEPTH, BG_SPACER_CLOUD_HEIGHT, CLOUD_FADE_RATE, CLOUD_SPEED, PERSPECTIVE, SPLITPOINT_CLOUD_DEPTH, SPLITPOINT_HEIGHT, ZRANGE_CLOUD_MAX, Z_BACKGROUND, backgroundPixiCanvas } from "./consts";
import { type position3d, getSpriteBbox, worldspaceToScreenspace, calcOffsetBetweenLayers } from "./3dCalc";
import { tileXCloud } from "./assets";


interface cloudDetails {
    startPos: position3d;
    originalWidth: number;
    originalHeight: number;
    alpha: number;
    fadeInAlpha: number;
    scaling: number;
    speedX: number;
    cloudSprite: Sprite;
    debugRect?: NineSlicePlane;
}

interface coverCloudDetails {
    upperCloudSprite: TilingSprite;
    lowerCloudSprite: TilingSprite;
    centerFillSprite: Sprite;
    originalWidth: number;
    originalHeight: number;
    alpha: number;
    scaling: number;
    speedX: number;
    startX?: number;
    Z?: number;
}

export const clouds: cloudDetails[] = [];
export const coverClouds: coverCloudDetails[] = [];

export const addCloud = (cloudSprite: Sprite, x: number = 0, y: number = 0, z: number = 0, scale: number, alpha: number, debugRect: NineSlicePlane) => {
    const cloud: cloudDetails = {
        startPos: {
            x: x,
            y: y,
            z: z,
        },
        originalWidth: cloudSprite.width,
        originalHeight: cloudSprite.height,
        fadeInAlpha: 0,
        alpha: alpha,
        scaling: scale,
        speedX: CLOUD_SPEED,
        cloudSprite: cloudSprite,
        debugRect: debugRect,
    };
    clouds.push(cloud);
};

let cloudXtileTexture: Texture | null = null;
export const addCoverCloud = () => {
    const backgroundCanvas = backgroundPixiCanvas.get();
    const globalScaling = 1.0;
    const cloudXTileTextureWidth = tileXCloud.width;
    const cloudXTileTextureHeight = tileXCloud.height;
    cloudXtileTexture = cloudXtileTexture || Texture.from(tileXCloud.src, { width: cloudXTileTextureWidth, height: cloudXTileTextureHeight });

    const upperCloud = new TilingSprite(cloudXtileTexture, cloudXTileTextureWidth, cloudXTileTextureHeight);
    const lowerCloud = new TilingSprite(cloudXtileTexture, cloudXTileTextureWidth, cloudXTileTextureHeight);
    const centerFill = new Sprite(Texture.WHITE);

    const z = ZRANGE_CLOUD_MAX - (Z_BACKGROUND - ZRANGE_CLOUD_MAX) * 2;
    const reverseScale = (globalScaling * (((PERSPECTIVE + z) / PERSPECTIVE) * BG_SPACER_CLOUD_HEIGHT)) / cloudXTileTextureHeight;
    centerFill.width = window.innerWidth;
    upperCloud.width = window.innerWidth;
    lowerCloud.width = window.innerWidth;
    upperCloud.height = BG_SPACER_CLOUD_HEIGHT;
    lowerCloud.height = BG_SPACER_CLOUD_HEIGHT;
    centerFill.zIndex = 900 + Z_BACKGROUND - z;
    upperCloud.zIndex = Z_BACKGROUND - z;
    lowerCloud.zIndex = Z_BACKGROUND - z;

    backgroundCanvas?.stage.addChild(upperCloud);
    backgroundCanvas?.stage.addChild(lowerCloud);
    backgroundCanvas?.stage.addChild(centerFill);

    greyscaleTintSprite(upperCloud, Math.random() * 0x20 + 0xdf); // tint wil get coppied to lower cloud later
    const scale = reverseScale / (globalScaling * globalScaling);
    const cloud: coverCloudDetails = {
        originalWidth: cloudXTileTextureWidth,
        originalHeight: cloudXTileTextureHeight,
        alpha: 1.0,
        scaling: scale,
        speedX: CLOUD_SPEED,
        upperCloudSprite: upperCloud,
        lowerCloudSprite: lowerCloud,
        centerFillSprite: centerFill,
    };
    coverClouds.push(cloud);
    return cloud;
};

export const greyscaleTintSprite = (cloudSprite: Sprite, value: number) => {
    const tint = (value << 16) + (value << 8) + value;
    cloudSprite.tint = tint;
}

export const calculateCloudPosition3d = (cloud: cloudDetails, timeElapsed: number, scrollY: number, windowWidth: number, windowHeight: number, globalScaling: number) => {
    const startPos = cloud.startPos;
    const z = startPos.z;
    const scale = PERSPECTIVE / (PERSPECTIVE + z);
    const cloudWidth = cloud.originalWidth * cloud.scaling * globalScaling;
    const cloudHeight = cloud.originalHeight * cloud.scaling * globalScaling;
    const depthwindowHeight = windowHeight / scale;
    const depthwindowWidth = windowWidth / scale;
    const x = (startPos.x + timeElapsed * cloud.speedX) % (depthwindowWidth + cloudWidth) - cloudWidth;
    const yWrap = depthwindowHeight + cloudHeight;
    const startY = (startPos.y + cloudHeight) % yWrap - cloudHeight * 2;
    const y = -Math.floor((startY - scrollY + cloudHeight) / yWrap) * yWrap + startY //- depthCloudHeight + 20;
    return { x, y, z };
}

export const calculateXtileCloudPosition = (cloud: coverCloudDetails, timeElapsed: number, scrollY: number, splitPoint: number, globalScaling: number) => {
    const startX = 0;
    const z = ZRANGE_CLOUD_MAX;
    const pScale = PERSPECTIVE / (PERSPECTIVE + z);
    const cloudHeight = cloud.originalHeight * cloud.scaling * globalScaling * pScale;
    // const depthwindowHeight = windowHeight / pScale;
    // const depthwindowWidth = windowWidth / pScale;
    const x0 = (startX + timeElapsed * cloud.speedX);
    const y1 = calcOffsetBetweenLayers(splitPoint, window.innerHeight + SPLITPOINT_HEIGHT, window.innerHeight - cloudHeight, BG_DEPTH, SPLITPOINT_CLOUD_DEPTH);
    const y2 = calcOffsetBetweenLayers(splitPoint, 0, cloudHeight, BG_DEPTH, SPLITPOINT_CLOUD_DEPTH);
    // const x = x0 * pScale;
    // const yStart = (y1 - scrollY) * pScale;
    // const yEnd = (y2 - scrollY) * pScale;
    const x = worldspaceToScreenspace({ x: x0, y: 0, z: z }, scrollY).x;
    const yStart = worldspaceToScreenspace({ x: 0, y: y1, z: z }, scrollY).y;
    const yEnd = worldspaceToScreenspace({ x: 0, y: y2, z: z }, scrollY).y;
    return { x, yStart, yEnd, scale: pScale };
}

export const placeUniformCloud = (width: number, height: number, z: number, windowWidth: number, ySpacing: number, xSpacing: number, startY: number, cumulativeCloudWidth: number) => {
    const startX = cumulativeCloudWidth + xSpacing;
    const pScale = PERSPECTIVE / (PERSPECTIVE + z);
    const depthwindowWidth = windowWidth / pScale;
    const wrap = depthwindowWidth + width;
    const x = startX % wrap - width;
    const y = startY + Math.floor((startX - width) / (wrap)) * ySpacing;
    return { x, y, z };
}

const updateSpacerCloud = (coverCloudSprite: TilingSprite, originalHeight: number, x: number, y: number, scale: number, globalScaling: number) => {
    const scaling = 1;
    const trueScale = scale * scaling * globalScaling;
    coverCloudSprite.tilePosition.x = x;
    coverCloudSprite.y = y;
    coverCloudSprite.width = window.innerWidth;
    coverCloudSprite.height = originalHeight * trueScale;
    coverCloudSprite.tileScale.set(trueScale);
    coverCloudSprite.renderable = true;
}

export const updateSpacerClouds = (bgSplitPoints: number[], scrollY: number) => {
    const globalScaling = 1.0;
    let i = 0;
    console.log(bgSplitPoints);
    for (; i < bgSplitPoints.length; i++) {
        const splitPoint = bgSplitPoints[i];
        const cloud = coverClouds[i] || addCoverCloud();
        const upperCloud = cloud.upperCloudSprite;
        const lowerCloud = cloud.lowerCloudSprite;
        const centerFill = cloud.centerFillSprite;
        const cloudHeight = upperCloud.height
        const { x, yStart, yEnd, scale } = calculateXtileCloudPosition(cloud, sumTime, scrollY, splitPoint, 1.0);
        updateSpacerCloud(upperCloud, cloud.originalHeight, x, yStart, scale, globalScaling);
        lowerCloud.scale.y = -1;
        updateSpacerCloud(lowerCloud, cloud.originalHeight, x, yEnd, scale, globalScaling);

        // center fill
        centerFill.position.set(0, yStart + cloudHeight - 2);
        centerFill.height = yEnd - yStart - cloudHeight * 2 + 4;
        centerFill.width = window.innerWidth;
        centerFill.tint = upperCloud.tint;
        lowerCloud.tint = upperCloud.tint
        centerFill.zIndex = upperCloud.zIndex = lowerCloud.zIndex = 1;

        // enable all:
        centerFill.renderable = true;
        lowerCloud.renderable = true;
        upperCloud.renderable = true;
    }
    while (coverClouds[i] && coverClouds[i].centerFillSprite.renderable) {
        const cloud = coverClouds[i];
        cloud.upperCloudSprite.renderable = false;
        cloud.lowerCloudSprite.renderable = false;
        cloud.centerFillSprite.renderable = false;
        i++;
    }
}

let sumTime = 0;
let lastScrollY: number, lastScrollX: number, lastWindowWidth: number, lastWindowHeight = 0;
export const updateClouds = (deltaTime: number, bgSplitPoints: number[], globalScaling: number) => {
    sumTime += deltaTime;
    // // const forgroundCanvas = forgroundPixiCanvas.get();
    // const backgroundCanvas = backgroundPixiCanvas.get();
    const scrollY = window.scrollY// + window.screenY;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const screenWidth = window.screen.width || windowWidth;
    const screenHeight = window.screen.height || windowHeight;
    const scrollX = window.scrollX;
    const windowSizeChanged = windowWidth !== lastWindowWidth || windowHeight !== lastWindowHeight;
    const scrollChanged = scrollY !== lastScrollY || scrollX !== lastScrollX || windowSizeChanged;


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

        const faderate = 0.002 * cloud.speedX;
        let alpha = cloud.alpha;
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
        if (cloudCenterX < 0 || cloudCenterX > windowWidth || cloudCenterY < topBound || cloudCenterY > bottomBound) {
            alpha += faderate;
        } else if (bbox.right > leftBound && bbox.left < rightBound && bbox.bottom > topBound && bbox.top < bottomBound) {
            alpha -= faderate;
        } else {
            alpha -= faderate;
        }
        alpha = Math.min(Math.max(alpha, 0), 1);

        // const distFromCenter = Math.pow(Math.pow(x - windowWidth / 2, 2) + Math.pow(y - windowHeight / 2, 2), 0.5);
        // const ramp = 2;
        // const distFromCenter = Math.pow(Math.abs(x - windowWidth / 2) + Math.abs(y - windowHeight / 2), ramp);
        // alpha += distFromCenter / Math.pow(windowWidth + windowHeight, ramp) * 100;
        // cloud.cloudSprite.alpha = alpha;
        // cloud.cloudSprite.renderable = false;

        // alpha *= Math.max(
        //     Math.max((x - windowWidth), (0 - x)) / windowWidth,
        //     // Math.max((y - windowHeight), (0 - y)) / windowHeight
        //     0
        // ) * 3 // + (Math.sin(scrollY / 1000) + 1);

        cloud.cloudSprite.x = x;
        cloud.cloudSprite.y = y;

        if (cloud.fadeInAlpha != 1) cloud.fadeInAlpha = Math.min(cloud.fadeInAlpha + CLOUD_FADE_RATE * deltaTime, 1);

        if (alpha > 0) {
            cloud.cloudSprite.x = x;
            cloud.cloudSprite.y = y;
            cloud.cloudSprite.alpha = cloud.fadeInAlpha// * cloud.alpha;
            cloud.cloudSprite.scale.set(trueScale);
            cloud.cloudSprite.renderable = true;
        } else {
            cloud.cloudSprite.renderable = false;
        }
    }

    // let i = 0;
    // for (; i < bgSplitPoints.length; i++) {
    //     const cloudTop = coverClouds[2 * i];
    //     const lowerCloud = coverClouds[2 * i + 1];
    //     const pos2d = calculateXtileCloudPosition(cloudTop, sumTime, scrollY, bgSplitPoints[i], windowWidth, windowHeight, globalScaling);
    //     const pos2dTop = { x: pos2d.x, y: pos2d.yStart, scale: pos2d.scale };
    //     const pos2dBottom = { x: pos2d.x, y: pos2d.yEnd, scale: pos2d.scale };
    //     updateSpacerCloud(cloudTop, pos2dTop, globalScaling);
    //     lowerCloud.cloudSprite.scale.y = -1;
    //     updateSpacerCloud(lowerCloud, pos2dBottom, globalScaling);
    //     const bodySprite = coverCloudBodySprites[i]
    //     if (!bodySprite) { console.log("bs"); continue }
    //     bodySprite.x = 0;
    //     bodySprite.y = pos2dTop.y + cloudTop.cloudSprite.height - 2;
    //     bodySprite.height = pos2dBottom.y - pos2dTop.y - cloudTop.cloudSprite.height * 2 + 4;
    //     bodySprite.width = windowWidth;
    //     bodySprite.tint = cloudTop.cloudSprite.tint;
    //     lowerCloud.cloudSprite.tint = cloudTop.cloudSprite.tint;
    //     bodySprite.renderable = true;
    //     bodySprite.zIndex = 99000;
    //     bodySprite.alpha = lowerCloud.cloudSprite.alpha = 90;
    //     lowerCloud.cloudSprite.renderable = true;
    //     cloudTop.cloudSprite.renderable = true;
    // }
    // let j = i * 2;
    // while (coverClouds[j] && coverClouds[j].cloudSprite.renderable) {
    //     coverClouds[j].cloudSprite.renderable = false;
    //     j++;
    // }

    // while (coverCloudBodySprites[i]) {
    //     coverCloudBodySprites[i].renderable = false;
    //     i++;
    // }

    // for (let i = 0; i < coverClouds.length; i++) {
    //     const cloud = coverClouds[i];
    //     const pos3d = calculateCoverCloudPosition3d(cloud, sumTime, scrollY, windowWidth, windowHeight, bgSplitPoints);
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

    lastScrollY = scrollY;
    lastScrollX = scrollX;
    lastWindowWidth = windowWidth;
    lastWindowHeight = windowHeight;
};
