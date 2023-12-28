import { Sprite, type Container, type DisplayObject, Texture, Assets } from "pixi.js";
import defaultCursor from "$lib/images/icons/more-code-icon.svg?url";
import closeCursor from "$lib/images/icons/launch_black_24dp.svg?url";
import { openCardIndex } from "./consts";

let cursorSprite: Sprite;
const defaultTexture = Texture.from(defaultCursor);
const closeTexture = Texture.from(closeCursor);

const cursorSpeed = 0.1666;

let cursorX = 0;
let cursorY = 0;
export const addCursors = (canvasStage: Container<DisplayObject>) => {
    document.onmousemove = (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    };
    Assets.load([defaultCursor, closeCursor]).then(() => {
        cursorSprite = Sprite.from(defaultTexture);
        cursorSprite.anchor.set(0.4, 0.5);
        cursorSprite.position.set(cursorX, cursorY);
        cursorSprite.scale.set(36 / defaultTexture.width);
        cursorSprite.zIndex = 99999;
        canvasStage.addChild(cursorSprite);
    });
}

export const updateCursors = (deltaTime: number) => {
    if (!cursorSprite) return;
    if (openCardIndex.get() === -1) {
        cursorSprite.texture = defaultTexture;
    } else {
        cursorSprite.texture = closeTexture;
    }
    const cursorDeltaX = cursorX - cursorSprite.position.x;
    const cursorDeltaY = cursorY - cursorSprite.position.y;
    cursorSprite.x += cursorDeltaX * deltaTime * cursorSpeed;
    cursorSprite.y += cursorDeltaY * deltaTime * cursorSpeed;
}
