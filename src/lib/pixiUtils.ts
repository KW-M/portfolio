import { Assets, Sprite, type ICanvas, Texture, type Application } from "pixi.js";

export function addSpriteTexture(texture: Texture, canvas: Application<ICanvas>, zIndex: number) {
    const sp = Sprite.from(texture);
    sp.zIndex = zIndex;
    sp.alpha = 0;
    sp.renderable = false;
    canvas.stage.addChild(sp);
    return sp;
}

export async function addSpriteAsync(url: string, canvas: Application<ICanvas>, zIndex: number) {
    const texture = await Assets.load(url);
    return addSpriteTexture(texture, canvas, zIndex);
}

export function addSpriteSync(url: string, canvas: Application<ICanvas>, zIndex: number, width?: number, height?: number) {
    const texture = Texture.from(url, { width, height });
    return addSpriteTexture(texture, canvas, zIndex);
}
