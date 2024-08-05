
import { psudoRandomGenerator } from "./util";

// 1 192 186 23907 2391 159
export const PRNG = psudoRandomGenerator(159);
export const PERSPECTIVE = 800; // 800
export const SPLITPOINT_HEIGHT = 200;
export const SPLITPOINT_CLOUD_DEPTH = 1000;
export const SPRITE_DEBUG_ON = false;
export const DEBUG_ON = false;
export const DEBUG_FPS_ON = false;
export const DEBUG_SPRITE_ON = false;

// BACKGROUND CANVAS CONSTANTS
export const NUM_CLOUDS = 20; // 31
export const BACKGROUND_FADE_RATE = 0.001;
export const CLOUD_OPACITY = 1;
export const CLOUD_FADE_RATE = 0.0005;
export const CLOUD_SPEED = 0.02;
export const Z_BACKGROUND = 2000;
export const ZRANGE_CLOUD_MAX = 2000; // 1600; 200
export const ZRANGE_CLOUD_MIN = 400; // 500
export const ZRANGE_CLOUD = ZRANGE_CLOUD_MAX - ZRANGE_CLOUD_MIN;

// PAGE TRANSITION CONSTANTS
export const PAGE_FADE_DELAY = 500;
export const PAGE_FADE_DURATION = 300;
