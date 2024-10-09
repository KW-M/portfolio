import { Sprite, Application } from "pixi.js";
import { CLOUD_FADE_RATE, CLOUD_OPACITY, CLOUD_SPEED, NUM_CLOUDS, PERSPECTIVE, ZRANGE_CLOUD, ZRANGE_CLOUD_MAX, ZRANGE_CLOUD_MIN } from "./consts";
import { type position3d, getSpriteBbox, worldspaceToScreenspace } from "./3dCalc";
import { baseClouds } from "./assets";
import { addSpriteAsync, greyscaleTintSprite, placeSpriteScaled } from "./pixiUtils";
import { pickPsudoRandom } from "./util";
import { CANVAS_SCALED_HEIGHT, CANVAS_SCALED_WIDTH, GLOBAL_SCALE_X, GLOBAL_SCALE_Y, GLOBALSCALE, PREFERS_REDUCED_MOTION, SCROLL_X, SCROLL_Y, SHIFT_X, SHIFT_Y, SUM_TIME } from "./canvasScale";

interface cloudDetails {
    startPos: position3d;
    originalWidth: number;
    originalHeight: number;
    alpha: number;
    fadeInAlpha: number;
    scaling: number;
    speedX: number;
    cloudSprite: Sprite;
    debugRect?: Sprite;
}

export const clouds: cloudDetails[] = [];

export async function addClouds(PRNG: () => number = Math.random, app: Application) {
    for (let i = 0; i < NUM_CLOUDS; i++) {
        const x = PRNG() * CANVAS_SCALED_WIDTH * 181;
        const y = PRNG() * CANVAS_SCALED_HEIGHT * 181;
        const z = PRNG() * ZRANGE_CLOUD + ZRANGE_CLOUD_MIN;
        const sp = await addSpriteAsync(pickPsudoRandom(baseClouds, PRNG).src, app, ZRANGE_CLOUD_MAX - z);
        greyscaleTintSprite(sp, PRNG() * 35 + 220); //  * 55 + 200
        clouds.push({
            startPos: { x: x, y: y, z: z },
            originalWidth: sp.width,
            originalHeight: sp.height,
            fadeInAlpha: 0,
            alpha: 0.8,
            scaling: 1,
            speedX: CLOUD_SPEED,
            cloudSprite: sp,
        });
    }
}

export const calculateCloudPosition3d = (cloud: cloudDetails, timeElapsed: number, shiftX: number, shiftY: number) => {
    const startPos = cloud.startPos;
    const z = startPos.z;
    const scale = PERSPECTIVE / (PERSPECTIVE + z);
    const cloudWidth = cloud.originalWidth * cloud.scaling * GLOBAL_SCALE_X;
    const cloudHeight = cloud.originalHeight * cloud.scaling * GLOBAL_SCALE_Y;
    const depthwindowHeight = CANVAS_SCALED_HEIGHT / scale;
    const depthwindowWidth = CANVAS_SCALED_WIDTH / scale;
    const scaledShiftX = shiftX / scale;
    const x = (startPos.x + scaledShiftX + timeElapsed * cloud.speedX) % (depthwindowWidth + cloudWidth) - cloudWidth;
    const yWrap = depthwindowHeight + cloudHeight;
    const startY = (startPos.y + cloudHeight) % yWrap - cloudHeight * 2;
    const y = -Math.floor((startY - shiftY + cloudHeight) / yWrap) * yWrap + startY //- depthCloudHeight + 20;
    return { x, y, z };
}


export const updateClouds = (deltaTime: number) => {
    for (let i = 0; i < clouds.length; i++) {
        const cloud = clouds[i];
        if (PREFERS_REDUCED_MOTION.get()) {
            cloud.fadeInAlpha = Math.max(cloud.fadeInAlpha - CLOUD_FADE_RATE * deltaTime, 0);
            cloud.cloudSprite.alpha = cloud.fadeInAlpha;
            continue;
        }

        const pos3d = calculateCloudPosition3d(cloud, SUM_TIME, SCROLL_X + SHIFT_X, SCROLL_Y - SHIFT_Y);
        const { x, y, scale } = worldspaceToScreenspace(pos3d, SCROLL_X + SHIFT_X, SCROLL_Y - SHIFT_Y);
        const trueScale = scale * cloud.scaling;

        const bbox = getSpriteBbox(x, y, trueScale * GLOBALSCALE, cloud.cloudSprite);

        const faderate = CLOUD_FADE_RATE * deltaTime;
        let alpha = cloud.alpha;
        const leftBound = CANVAS_SCALED_WIDTH * (15 / 20);
        const rightBound = CANVAS_SCALED_WIDTH * (3 / 20)
        const topBound = CANVAS_SCALED_HEIGHT * (12 / 20);
        const bottomBound = CANVAS_SCALED_HEIGHT * (8 / 20);

        // if (!cloud.debugRect) {
        //     cloud.debugRect = new Sprite(Texture.WHITE);
        //     cloud.cloudSprite.parent.addChild(cloud.debugRect);
        //     cloud.debugRect.renderable = true;
        // }
        // cloud.debugRect.width = (bbox.right - bbox.left);
        // cloud.debugRect.height = (bbox.bottom - bbox.top);
        // cloud.debugRect.tint = 0x000000;
        // cloud.debugRect.alpha = 0.0;
        // cloud.debugRect.zIndex = 99999;
        // cloud.debugRect.position.set(bbox.left, bbox.top);

        // cloud.debugRect.width = (rightBound - leftBound);
        // cloud.debugRect.height = (bottomBound - topBound);
        // cloud.debugRect.tint = 0x000000;
        // cloud.debugRect.alpha = 0.1;
        // cloud.debugRect.zIndex = 99999;
        // cloud.debugRect.position.set(leftBound, topBound);


        // if (bboxOverlaps(bbox, { left: leftBound, right: rightBound, top: topBound, bottom: bottomBound })) {
        //     alpha -= faderate;
        // }
        // if (bbox.right < leftBound || bbox.left > rightBound || bbox.bottom < topBound || bbox.top > bottomBound) {
        //     alpha += faderate;
        //     cloud.debugRect.tint = 0x0000ff;
        // }
        // if (true && (cloudCenterX < 0 || cloudCenterX > CANVAS_WIDTH || cloudCenterY < 0 || cloudCenterY > CANVAS_HEIGHT)) {
        // alpha += faderate;
        // } else

        // if (!((bbox.bottom < CANVAS_SCALED_HEIGHT || bbox.top > 0) || (bbox.right < CANVAS_SCALED_WIDTH || bbox.left > 0))) {
        //     alpha -= faderate;
        //     // cloud.debugRect.tint = 0x0000ff;
        //     // cloud.debugRect.alpha = .1;
        // } else {
        //     // cloud.debugRect.tint = 0x00ffff;
        //     alpha += faderate;
        // }

        // const alphaMin = Math.max(1 - distFromSpacer / (CANVAS_SCALED_HEIGHT * 3), 0);
        // alpha = Math.min(Math.max(alpha, alphaMin), 1);



        if (cloud.fadeInAlpha < 1) cloud.fadeInAlpha = Math.min(cloud.fadeInAlpha + CLOUD_FADE_RATE * deltaTime, 1);
        const finalAlpha = Math.max(Math.min(cloud.fadeInAlpha * alpha, CLOUD_OPACITY), 0);
        if (finalAlpha > 0 || cloud.cloudSprite.alpha > 0) {
            placeSpriteScaled(cloud.cloudSprite, x, y, trueScale);
            cloud.cloudSprite.alpha = finalAlpha;
            cloud.cloudSprite.renderable = true;
        } else {
            cloud.cloudSprite.renderable = false;
        }

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

        // cloud.cloudSprite.x = x;
        // cloud.cloudSprite.y = y;


    }
};

export const destroyClouds = () => {
    for (const cloud of clouds) cloud.cloudSprite.destroy();
    clouds.length = 0;
}
