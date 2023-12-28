import { Graphics, type ColorSource, type IRenderer, type ICanvas } from "pixi.js";

export function generateDebugRectTexture(renderer: IRenderer<ICanvas>) {
    const g = new Graphics();
    g.lineStyle(4, 0xf0f0f0, 0.9);
    g.beginFill(0x000000, 0.5);
    g.drawRoundedRect(0, 0, 30, 30, 5);
    g.endFill();
    const texture = renderer.generateTexture(g);
    g.destroy();
    return texture;
}

export function generateSquare(size: number, color: ColorSource, renderer: IRenderer<ICanvas>) {
    const g = new Graphics();
    g.lineStyle(0);
    g.beginFill(color, 1);
    g.drawRect(0, 0, size, size);
    g.endFill();
    const texture = renderer.generateTexture(g);
    g.destroy();
    return texture;
}
