import type { Sprite } from "pixi.js";
import { PERSPECTIVE } from "./consts";

export interface position3d {
    x: number;
    y: number;
    z: number;
}

export interface bbox {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

export const worldspaceToScreenspace = (pos: position3d, scrollY: number) => {
    const scale = PERSPECTIVE / (PERSPECTIVE + pos.z);
    const x = pos.x * scale;
    const y = (pos.y - scrollY) * scale;
    return { x, y, scale };
}

export const screenspaceToWorldspace = (screenPos: position3d, scrollY: number) => {
    const scale = PERSPECTIVE / (PERSPECTIVE + screenPos.z);
    const x = screenPos.x / scale;
    const y = screenPos.y / scale + scrollY;
    return { x, y, z: screenPos.z };
}

export const parallaxMovmentBetweenLayers = (z1: number, z2: number, shiftInZ1: number) => {
    const scale1 = PERSPECTIVE / (PERSPECTIVE + z1);
    const scale2 = PERSPECTIVE / (PERSPECTIVE + z2);
    return shiftInZ1 * scale2 / scale1;
}


export const getSpriteBbox = (x: number, y: number, scale: number, sprite: Sprite): bbox => {
    const width = sprite.width / sprite.scale.x * scale;
    const height = sprite.height / sprite.scale.y * scale;
    return {
        left: x,
        right: x + width,
        top: y,
        bottom: y + height,
    } as bbox
}

export const bboxIsVisible = (box: bbox, screenWidth: number, screenHeight: number) => {
    return box.right > 0 && box.left < screenWidth && box.bottom > 0 && box.top < screenHeight;
}

/** @returns  true if any part of box1 overlaps with box2 */
export const bboxOverlaps = (box1: bbox, box2: bbox) => {
    return box1.right > box2.left && box1.left < box2.right && box1.bottom > box2.top && box1.top < box2.bottom;
}

/** @returns  true if the box is completely off the top of the screen */
export const bboxIsOffTop = (box: bbox) => {
    return box.bottom < 0;
}

/** @returns  true if the box is completely off the bottom of the screen */
export const bboxIsOffBottom = (box: bbox, screenHeight: number) => {
    return box.top > screenHeight;
}

/** @returns  true if the box is completely off the left of the screen */
export const bboxIsOffLeft = (box: bbox) => {
    return box.right < 0;
}

/** @returns  true if the box is completely off the right of the screen */
export const bboxIsOffRight = (box: bbox, screenWidth: number) => {
    return box.left > screenWidth;
}
