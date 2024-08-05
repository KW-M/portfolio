import { Assets, Sprite, Texture, type Application } from "pixi.js";
import { GLOBAL_SCALE_X, GLOBAL_SCALE_Y } from "./canvasScale";

/** Add a sprite to a pixi canvas with an existing pixi texture */
export function addSpriteTexture(texture: Texture, canvas: Application, zIndex: number) {
    const sp = Sprite.from(texture);
    sp.zIndex = zIndex;
    sp.alpha = 0;
    sp.renderable = false;
    canvas.stage.addChild(sp);
    return sp;
}

/** Add a sprite to a pixi canvas and return it after waiting for the  texture to load from the url */
export async function addSpriteAsync(url: string, canvas: Application, zIndex: number) {
    const texture = await Assets.load(url);
    return addSpriteTexture(texture, canvas, zIndex);
}

/**
 * Tint a sprite with a greyscale value
 * @param sp Sprite to be tinted
 * @param value value between 0 and 255 to be used as tint (greyscale black to full white)
 */
export const greyscaleTintSprite = (sp: Sprite, value: number) => {
    const tint = (value << 16) + (value << 8) + value;
    sp.tint = tint;
}

export const placeSpriteScaled = (sp: Sprite, x: number, y: number, scale: number) => {
    sp.position.set(x * GLOBAL_SCALE_X, y * GLOBAL_SCALE_Y);
    sp.scale.set(scale * GLOBAL_SCALE_X, scale * GLOBAL_SCALE_Y);
}

export const placeSpriteDimensioned = (sp: Sprite, x: number, y: number, width: number, height: number, scale: number = 1) => {
    sp.position.set(x * GLOBAL_SCALE_X, y * GLOBAL_SCALE_Y);
    sp.width = width * GLOBAL_SCALE_X * scale;
    sp.height = height * GLOBAL_SCALE_Y * scale;
}
