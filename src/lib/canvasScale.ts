import { Ticker, type Application } from "pixi.js";
import nStore from "$lib/libraries/nStore"

// export const backgroundPixiCanvas = nStore<null | Application>(null);

export const STANDARD_RESOLUTION = 863 //1080;
export const CANVAS_BORDER_WIDTH = 20;

// Live Updated Global Variables
export let SUM_TIME = 0;

export let GLOBALSCALE = 1;
export let GLOBAL_SCALE_X = 1;
export let GLOBAL_SCALE_Y = 1;

export let CANVAS_HTML_TOP = 0;
export let CANVAS_HTML_LEFT = 0;
export let CANVAS_HTML_WIDTH: number;
export let CANVAS_HTML_HEIGHT: number;
export let CANVAS_SCALED_WIDTH: number;
export let CANVAS_SCALED_HEIGHT: number;

export let SCREEN_WIDTH = 0;
export let SCREEN_HEIGHT = 0;

export let SCROLL_Y = 0;
export let SCROLL_X = 0;
export let CURSOR_X = 0;
export let CURSOR_Y = 0;
export let SHIFT_X = 0;
export let SHIFT_Y = 0;

export let WINDOW_SIZE_CHANGED = false;
export let SCROLL_CHANGED = false;
export let MOUSE_CHANGED = false;
export let LAST_INPUT_TIME = 0;

export const PREFERS_REDUCED_MOTION = nStore(false);

let lastWindowWidth = -1;
let lastWindowHeight = -1;
let lastScrollY = -1;
let lastScrollX = -1;
let lastMouseX = -1;
let lastMouseY = -1;
let lastTriggerFPS = 60;
let fps = 60;
let frameCount = 0;
let resizeCount = -1;

export const htmlCoordsToCanvasCoords = (x: number, y: number) => {
    const newx = (x - CANVAS_HTML_LEFT) * CANVAS_SCALED_WIDTH / CANVAS_HTML_WIDTH;
    const newy = (y - CANVAS_HTML_TOP) * CANVAS_SCALED_HEIGHT / CANVAS_HTML_HEIGHT;
    return [newx, newy];
}

export const setWindowSizeChanged = (value: boolean) => {
    WINDOW_SIZE_CHANGED = value;
}

const updateCanvasScaling = (app: Application, width: number, height: number) => {
    const scaleX = (app.renderer.width / width) * GLOBALSCALE;
    const scaleY = (app.renderer.height / height) * GLOBALSCALE;
    app.stage.scale.set(scaleX, scaleY);
    CANVAS_SCALED_WIDTH = (app.renderer.width) / scaleX;
    CANVAS_SCALED_HEIGHT = (app.renderer.height) / scaleY;
};

const updateCanvasResolution = (app: Application, width: number, height: number) => {
    console.log(fps)
    const resolutionFactor = (window.devicePixelRatio || 1) * 0.5 * Math.min(Math.max(fps, 0.3), 1.0); //0.2
    app.renderer.resize(width * resolutionFactor, height * resolutionFactor);
    updateCanvasScaling(app, width, height);
    setWindowSizeChanged(true);
};

const updateCanvasHtmlVariables = (app: Application) => {
    const canvasRect = app.canvas.getBoundingClientRect();
    CANVAS_HTML_WIDTH = canvasRect.width - (2 * CANVAS_BORDER_WIDTH);
    CANVAS_HTML_HEIGHT = canvasRect.height - (2 * CANVAS_BORDER_WIDTH);
    CANVAS_HTML_LEFT = canvasRect.left + CANVAS_BORDER_WIDTH;
    CANVAS_HTML_TOP = canvasRect.top + CANVAS_BORDER_WIDTH;
}


export const initDisplayVariables = (app: Application) => {
    updateCanvasHtmlVariables(app);
    document.onmousemove = (e) => {
        CURSOR_X = e.clientX;
        CURSOR_Y = e.clientY;
    };
}


export const updateDisplayVariables = (timeTick: Ticker, app: Application) => {
    SUM_TIME += timeTick.deltaMS;
    frameCount++;
    // if (frameCount > 90) fps = Math.min(timeTick.FPS, fps) + 0.1;
    if (frameCount > 90) fps = (timeTick.FPS * 0.5 + fps * 0.5) / timeTick.maxFPS;

    const wr = CANVAS_HTML_WIDTH / STANDARD_RESOLUTION
    const hr = CANVAS_HTML_HEIGHT / STANDARD_RESOLUTION;
    GLOBALSCALE = Math.sqrt(((wr + hr) / 2) * Math.max(wr, hr))
    GLOBAL_SCALE_X = GLOBALSCALE;
    GLOBAL_SCALE_Y = GLOBALSCALE;


    SCREEN_WIDTH = window.screen.width || window.innerWidth;
    SCREEN_HEIGHT = window.screen.height || window.innerHeight;
    SCROLL_Y += (window.scrollY - SCROLL_Y) * 0.8; // add smoothing
    SCROLL_X += (window.scrollX - SCROLL_X) * 0.8; // add smoothing;
    WINDOW_SIZE_CHANGED = (window.innerWidth !== lastWindowWidth || window.innerHeight !== lastWindowHeight);
    SCROLL_CHANGED = (SCROLL_Y !== lastScrollY || SCROLL_X !== lastScrollX) || WINDOW_SIZE_CHANGED;
    MOUSE_CHANGED = (CURSOR_X !== lastMouseX || CURSOR_Y !== lastMouseY);
    lastWindowWidth = window.innerWidth;
    lastWindowHeight = window.innerHeight;
    lastScrollY = SCROLL_Y;
    lastScrollX = SCROLL_X;
    lastMouseX = CURSOR_X;
    lastMouseY = CURSOR_Y;

    // save power by lowering refresh rate when no user input happens
    if (SCROLL_CHANGED || MOUSE_CHANGED) {
        // SHIFT_Y -= (SHIFT_Y - (CURSOR_Y / CANVAS_HTML_HEIGHT) * 50) * 0.1;
        // SHIFT_X -= (SHIFT_X - (CURSOR_X / CANVAS_HTML_WIDTH) * 50) * 0.1;
        LAST_INPUT_TIME = SUM_TIME;
    }
    if (SUM_TIME < LAST_INPUT_TIME + 10) timeTick.maxFPS = 60;
    else timeTick.maxFPS = 10;

    // update canvas scaling/resolution when window size changes
    if (WINDOW_SIZE_CHANGED) {
        resizeCount = 100;
        updateCanvasHtmlVariables(app);
        updateCanvasScaling(app, CANVAS_HTML_WIDTH, CANVAS_HTML_HEIGHT);
    } else if (resizeCount > 0) {
        resizeCount--;
    } else if (resizeCount == 0 || Math.abs(lastTriggerFPS - fps) > 10) {
        resizeCount = -1;
        lastTriggerFPS = fps;
        updateCanvasResolution(app, CANVAS_HTML_WIDTH, CANVAS_HTML_HEIGHT);
    }


}


const updatePrefersReducedMotion = (e: MediaQueryList | MediaQueryListEvent) => {
    PREFERS_REDUCED_MOTION.set(e.matches);
}

let rmQuery: MediaQueryList;
export const setAccesibiltyPrefs = () => {
    rmQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    updatePrefersReducedMotion(rmQuery);
    rmQuery.addEventListener('change', updatePrefersReducedMotion);
}

export const cleanupAccesibiltyPrefs = () => {
    rmQuery.removeEventListener('change', updatePrefersReducedMotion);
}
