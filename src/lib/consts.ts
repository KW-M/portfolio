import type { Application } from "pixi.js";
import nStore from "./libraries/nStore";
import { psudoRandomGenerator } from "./util";
// 1 192 186 23907 2391 159
export const PRNG = psudoRandomGenerator(159);
export const PERSPECTIVE = 800;
export const SPLITPOINT_HEIGHT = 200;
export const BG_DEPTH = 2000;
export const SPLITPOINT_CLOUD_DEPTH = 1000;
export const SPRITE_DEBUG_ON = false;
export const DEBUG_ON = false;
export const DEBUG_FPS_ON = false;
export const DEBUG_SPRITE_ON = false;

export const BACKGROUND_FADE_RATE = 0.02;
export const CLOUD_FADE_RATE = 0.03;
export let CLOUD_SPEED = 0.5;
export let Z_BACKGROUND = 2000;
export let Z_FORGROUND_BACKGROUND_CANVAS_SLICE = 200;
export let ZRANGE_CLOUD_MAX = 1600;
export let ZRANGE_CLOUD_MIN = 100;
export let ZRANGE_CLOUD = ZRANGE_CLOUD_MAX - ZRANGE_CLOUD_MIN;
export const BG_SPACER_HEIGHT = 200;
export const BG_SPACER_CLOUD_HEIGHT = 300;

export const openCardIndex = nStore<number>(-1);
export const forgroundPixiCanvas = nStore<null | Application>(null);
export const backgroundPixiCanvas = nStore<null | Application>(null);

// Live Updated Global Variables
export let SUM_TIME = 0;
export let GLOBALSCALE = 1;
export let WINDOW_WIDTH = window.innerWidth;
export let WINDOW_HEIGHT = window.innerHeight;
export let SCREEN_WIDTH = window.screen.width || window.innerWidth;
export let SCREEN_HEIGHT = window.screen.height || window.innerHeight;
export let SCROLL_Y = window.scrollY;
export let SCROLL_X = window.scrollX;
export let WINDOW_SIZE_CHANGED = false;
export let SCROLL_CHANGED = false;

let lastWindowWidth = WINDOW_WIDTH;
let lastWindowHeight = WINDOW_HEIGHT;
let lastScrollY = SCROLL_Y;
let lastScrollX = SCROLL_X;

export const updateDisplayVariables = (deltaTime: number) => {
    SUM_TIME += deltaTime;
    WINDOW_WIDTH = window.innerWidth;
    WINDOW_HEIGHT = window.innerHeight;
    SCREEN_WIDTH = window.screen.width || window.innerWidth;
    SCREEN_HEIGHT = window.screen.height || window.innerHeight;
    SCROLL_Y = window.scrollY;
    SCROLL_X = window.scrollX;
    WINDOW_SIZE_CHANGED = (WINDOW_WIDTH !== lastWindowWidth || WINDOW_HEIGHT !== lastWindowHeight);
    SCROLL_CHANGED = (SCROLL_Y !== lastScrollY || SCROLL_X !== lastScrollX) || WINDOW_SIZE_CHANGED;
    lastWindowWidth = WINDOW_WIDTH;
    lastWindowHeight = WINDOW_HEIGHT;
    lastScrollY = SCROLL_Y;
    lastScrollX = SCROLL_X;
    GLOBALSCALE = Math.max(Math.min(WINDOW_WIDTH / 1920, WINDOW_HEIGHT / 1080), 0.7);
}

export const setAccesibiltyPrefs = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        CLOUD_SPEED = 0;
        Z_BACKGROUND = 0;
        Z_FORGROUND_BACKGROUND_CANVAS_SLICE = -1;
        ZRANGE_CLOUD_MAX = 0;
        ZRANGE_CLOUD_MIN = 0;
        ZRANGE_CLOUD = 0;
    }
}
