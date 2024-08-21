<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Application, Sprite, Texture, Ticker } from "pixi.js";
  import { browser } from "$app/environment";
  import { CANVAS_HTML_HEIGHT, CANVAS_HTML_WIDTH, CANVAS_SCALED_HEIGHT, CANVAS_SCALED_WIDTH, cleanupAccesibiltyPrefs, CURSOR_X, CURSOR_Y, htmlCoordsToCanvasCoords, initDisplayVariables, PREFERS_REDUCED_MOTION, setAccesibiltyPrefs, updateDisplayVariables } from "$lib/canvasScale";
  import { addClouds, destroyClouds, updateClouds } from "$lib/clouds";
  import { CLOUD_FADE_RATE, PRNG } from "$lib/consts";

  let app: Application = new Application();
  let canvas: HTMLCanvasElement;

  if (browser) {
    let square = new Sprite(Texture.WHITE);
    square.width = 600000;
    square.height = 600000;
    square.tint = 0xffffff;
    square.alpha = 0.0;
    // square.anchor.set(0.5);
    square.position.set(0, 0);

    const onTick = (timeTick: Ticker) => {
      updateDisplayVariables(timeTick, app);
      updateClouds(timeTick.deltaMS);
      // square.rotation += 0.01;
      // square.position.set(CANVAS_SCALED_WIDTH / 2, CANVAS_SCALED_HEIGHT / 2);
      // square.position.set(...htmlCoordsToCanvasCoords(CURSOR_X, CURSOR_Y));
      if (PREFERS_REDUCED_MOTION.get()) {
        square.renderable = true;
        if (square.alpha < 0.25) square.alpha += CLOUD_FADE_RATE * timeTick.deltaMS;
      } else if (square.alpha !== 0) {
        square.alpha = Math.max(square.alpha - CLOUD_FADE_RATE * timeTick.deltaMS, 0);
      } else if (square.alpha === 0) {
        square.renderable = false;
      }
    };

    onMount(async () => {
      await app.init({
        width: window.innerWidth,
        height: window.innerHeight,
        autoStart: true,
        backgroundAlpha: 0,
        canvas,
      });
      setAccesibiltyPrefs();
      initDisplayVariables(app);
      app.stage.interactive = false;
      app.stage.interactiveChildren = false;
      app.stage.sortableChildren = true;
      app.stage.addChild(square);
      addClouds(PRNG, app);
      app.ticker.add(onTick);
    });

    onDestroy(() => {
      destroyClouds();
      cleanupAccesibiltyPrefs();
      app.destroy(true, true);
    });
  }
</script>

<canvas bind:this={canvas} class="main-canvas"></canvas>

<style>
  .main-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    pointer-events: none;
    image-rendering: smooth;
    border: solid rgb(0, 0, 0) 20px;
    /* border-radius: 120px; */
  }
</style>
