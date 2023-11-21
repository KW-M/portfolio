import type { NineSlicePlane, Sprite } from "pixi.js";
import { PERSPECTIVE } from "./consts";
import { type position3d, bboxIsOffBottom, bboxIsOffLeft, bboxIsOffRight, bboxIsOffTop, getSpriteBbox, screenspaceToWorldspace, worldspaceToScreenspace } from "./3dCalc";



interface cloudDetails extends position3d {
    scaling: number;
    speedX: number;
    cloudSprite: Sprite;
    debugRect?: NineSlicePlane;
}

export const clouds: cloudDetails[] = [];

export const addCloud = (cloudSprite: Sprite, x: number = 0, y: number = 0, z: number = 0, debugRect: NineSlicePlane) => {
    const cloud: cloudDetails = {
        x: x,
        y: y,
        z: z,
        scaling: 1,
        speedX: 0.5,
        cloudSprite: cloudSprite,
        debugRect: debugRect,
    };
    clouds.push(cloud);
};

export const greyscaleTintSprite = (cloudSprite: Sprite, value: number) => {
    const tint = (value << 16) + (value << 8) + value;
    cloudSprite.tint = tint;
}



export const placeCloud = (cloud: cloudDetails, screenX: number, screenY: number, scrollY: number) => {
    const { x, y, z } = screenspaceToWorldspace({ x: screenX, y: screenY, z: cloud.z }, scrollY);
    console.log(`placing cloud at ${x},${y},${z} <= ${screenX},${screenY}`)
    cloud.x = x;
    cloud.y = y;
}


export const placeCloudX = (cloud: cloudDetails, scrollY: number, screenWidth: number, screenHeight: number) => {
    const screenX = -cloud.cloudSprite.width / 2 + 1;
    const screenY = Math.random() * screenHeight;
    placeCloud(cloud, screenX, screenY, scrollY);
    return { screenX, screenY };
}


export const placeCloudTop = (cloud: cloudDetails, screenX: number, scrollY: number, screenWidth: number, screenHeight: number) => {
    // const screenX = Math.random() * screenWidth;
    const screenY = 0 - cloud.cloudSprite.height / 2 + 10;
    placeCloud(cloud, screenX, screenY, scrollY);
    return { screenX, screenY };
}

export const placeCloudBottom = (cloud: cloudDetails, screenX: number, scrollY: number, screenWidth: number, screenHeight: number) => {
    // screenX = Math.random() * screenWidth;
    const screenY = screenHeight + cloud.cloudSprite.height / 2 - 10;
    placeCloud(cloud, screenX, screenY, scrollY);
    return { x: screenX, y: screenY };
}

export const updateClouds = (deltaTime: number, bgSplitPoints: number[]) => {
    const scrollY = window.scrollY;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    for (let i = 0; i < clouds.length; i++) {
        const cloud = clouds[i];
        cloud.x += cloud.speedX * deltaTime;
        let { x, y, scale } = worldspaceToScreenspace(cloud, scrollY);
        const bbox = getSpriteBbox(x, y, scale, cloud.cloudSprite)
        if (bboxIsOffTop(bbox)) {
            ({ x, y } = placeCloudBottom(cloud, x, scrollY, screenWidth, screenHeight));
            if (cloud.debugRect) cloud.debugRect.tint = 0xff0000;
        } else if (bboxIsOffBottom(bbox, screenHeight)) {
            placeCloudTop(cloud, x, scrollY, screenWidth, screenHeight);
            if (cloud.debugRect) cloud.debugRect.tint = 0x00ff00;
        }
        if (bboxIsOffLeft(bbox) || bboxIsOffRight(bbox, screenWidth)) {
            placeCloudX(cloud, scrollY, screenWidth, screenHeight);
            if (cloud.debugRect) cloud.debugRect.tint = 0x0000ff;
        }
        if (cloud.debugRect) {
            cloud.debugRect.position.set(bbox.left, bbox.top);
            cloud.debugRect.width = (bbox.right - bbox.left) || 0;
            cloud.debugRect.height = (bbox.bottom - bbox.top) || 0;
        }

        cloud.cloudSprite.x = x;
        cloud.cloudSprite.y = y;
        // let alpha = 0.0;
        // const distFromCenter = Math.pow(Math.pow(x - screenWidth / 2, 2) + Math.pow(y - screenHeight / 2, 2), 0.5);
        // const ramp = 5;
        // const distFromCenter = Math.pow(Math.abs(x - screenWidth / 2) + Math.abs(y - screenHeight / 2), ramp);
        // alpha += distFromCenter / Math.pow(screenWidth + screenHeight, ramp) * 100;
        // const smoothing = 300;
        // for (let j = 0; j < bgSplitPoints.length; j++) {
        //     const splitPointStart = bgSplitPoints[j] - 500;
        //     const splitPointEnd = bgSplitPoints[j];
        //     alpha += Math.max(0, Math.min(y - splitPointStart + smoothing, smoothing) * Math.min(splitPointEnd - y + smoothing, smoothing) / smoothing / smoothing)
        // }
        // cloud.cloudSprite.alpha = alpha;
        // cloud.cloudSprite.renderable = false;
        cloud.cloudSprite.alpha = 0.6;
        cloud.cloudSprite.alpha *= Math.max(
            Math.max((x - screenWidth), (0 - x)) / screenWidth,
            Math.max((y - screenHeight), (0 - y)) / screenHeight
        ) * 3 + (Math.sin(scrollY / 1000) + 1);
        cloud.cloudSprite.scale.set(scale * cloud.scaling);
    }

    // console.log(clouds.map(cloud => `x:${cloud.x},y:${cloud.y},z:${cloud.z}`));
};
