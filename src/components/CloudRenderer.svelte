<script lang="ts">
  import { onMount, onDestroy, afterUpdate } from "svelte";
  import { Application, Sprite, Ticker, Assets, NineSlicePlane, TilingSprite, BaseTexture, SCALE_MODES, settings, type IRenderer, type ICanvas, Texture } from "pixi.js";
  import { pickPsudoRandom, pickRandom } from "$lib/util";
  import { updateBackgrounds } from "$lib/bgCalc";
  import { addCloud, addCoverCloud, clouds, coverClouds, greyscaleTintSprite, updateClouds, updateSpacerClouds } from "$lib/cloudCalc";
  import { backgrounds, baseClouds, tileXCloud } from "$lib/assets";
  import { PRNG, SCROLL_CHANGED, WINDOW_SIZE_CHANGED, ZRANGE_CLOUD, ZRANGE_CLOUD_MAX, ZRANGE_CLOUD_MIN, Z_BACKGROUND, Z_FORGROUND_BACKGROUND_CANVAS_SLICE, backgroundPixiCanvas, forgroundPixiCanvas, updateDisplayVariables } from "$lib/consts";
  import { addCursors, updateCursors } from "$lib/cursor";
  import { generateDebugRectTexture, generateSquare } from "$lib/graphics";
  import { addSpriteAsync } from "$lib/pixiUtils";

  settings.ROUND_PIXELS = true;
  BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;

  let globalScaling = 1;
  let bgSplitPoints: number[] | null = null;

  const forgroundCanvas = new Application({
    backgroundAlpha: 0,
    antialias: false,
  });

  const backgroundCanvas = new Application({
    backgroundAlpha: 0,
    antialias: false,
    // backgroundColor: 0xffffff,
  });

  forgroundPixiCanvas.set(forgroundCanvas);
  backgroundPixiCanvas.set(backgroundCanvas);
  forgroundCanvas.stage.interactiveChildren = false;
  backgroundCanvas.stage.interactiveChildren = false;
  forgroundCanvas.stage.sortableChildren = true;
  backgroundCanvas.stage.sortableChildren = true;

  const debugRectTexture = generateDebugRectTexture(forgroundCanvas.renderer);
  // start loading assets:

  // async function addSplitClouds() {
  //   const tileXCloudTexture = await Assets.load(tileXCloud);
  //   for (let i = 0; i < 60; i++) {
  //     const rec = new NineSlicePlane(debugRectTexture, 5, 5, 5, 5);
  //     const sp = new TilingSprite(tileXCloudTexture, 2048, 408);
  //     const z = 0; //ZRANGE_CLOUD_MAX; // - (Z_BACKGROUND - ZRANGE_CLOUD_MAX);
  //     const cloudHeight = BG_SPACER_CLOUD_EDGE_HEIGHT;
  //     const reverseScale = (globalScaling * (((PERSPECTIVE + z) / PERSPECTIVE) * cloudHeight)) / sp.height;
  //     sp.width = window.innerWidth;
  //     greyscaleTintSprite(sp, PRNG() * 0x20 + 0xdf);
  //     addCoverCloud(sp, 0, -1000000, z, reverseScale / (globalScaling * globalScaling), 1.0, rec);
  //   }
  // }

  async function addClouds() {
    for (let i = 0; i < 34; i++) {
      const rec = new NineSlicePlane(debugRectTexture, 5, 5, 5, 5);
      const x = PRNG() * window.innerWidth * 181;
      const y = PRNG() * window.innerHeight * 181;
      const z = PRNG() * ZRANGE_CLOUD + ZRANGE_CLOUD_MIN;
      const canvas = z > Z_FORGROUND_BACKGROUND_CANVAS_SLICE ? backgroundCanvas : forgroundCanvas;
      const sp = await addSpriteAsync(pickPsudoRandom(baseClouds, PRNG).src, canvas, ZRANGE_CLOUD_MAX - z);
      greyscaleTintSprite(sp, PRNG() * 55 + 200);
      addCloud(sp, x, y, z, 2, 0.1, rec);
    }
  }
  // addSplitClouds().then(() => {
  // addBackgrounds();
  addClouds();
  // });

  // let cumulativeCloudWidths: number[] = [];
  // for (let i = 0; i < 60; i++) {
  //   const rec = new NineSlicePlane(debugRectTexture, 5, 5, 5, 5);
  //   const cloudIndex = i + (i % 3) + (i % 7) + (i % 11);
  //   const sp = Sprite.from(bigClouds[cloudIndex % bigClouds.length]);
  //   const z = Math.abs(i % 2) * 100 + 900;
  //   const cloudWidth = 2000;
  //   const xSpacing = (-cloudWidth * 1) / 5;
  //   const reverseScale = (globalScaling * (((PERSPECTIVE + z) / PERSPECTIVE) * cloudWidth)) / sp.width;
  //   const ySpacing = 500;
  //   const startY = ySpacing * (1 / 2);
  //   const { x, y } = placeUniformCloud(sp.width * reverseScale, sp.height * reverseScale, z, window.innerWidth, ySpacing, xSpacing, startY, cumulativeCloudWidths[z]);
  //   cumulativeCloudWidths[z] = (cumulativeCloudWidths[z] || 0) + sp.width * reverseScale + xSpacing;

  //   // sp.anchor.set(0.6 - z / 1700 / 4);
  //   const alpha = (sp.alpha = 1);
  //   greyscaleTintSprite(sp, Math.random() * 0x20 + 0xdf);
  //   // greyscaleTintSprite(sp, Math.random() * 0x80 + 0x80);
  //   addCoverCloud(sp, x, y, z, reverseScale / globalScaling, alpha, rec, globalScaling);
  // }

  // coverClouds
  //   .sort((a, b) => {
  //     return b.startPos.z - a.startPos.z;
  //   })
  //   .forEach((cloud) => {
  //     cloud.cloudSprite.zIndex = ZRANGE_CLOUD_MAX;
  //     backgroundCanvas.stage.addChild(cloud.cloudSprite);
  //     if (cloud.debugRect && SPRITE_DEBUG_ON) forgroundCanvas.stage.addChild(cloud.debugRect);
  //   });

  // //sort by z
  // clouds
  //   .sort((a, b) => {
  //     return b.startPos.z - a.startPos.z;
  //   })
  //   .forEach((cloud) => {
  //     cloud.cloudSprite.zIndex = ZRANGE_CLOUD_MAX - cloud.startPos.z;
  //     if (cloud.startPos.z < Z_FORGROUND_BACKGROUND_CANVAS_SLICE) forgroundCanvas.stage.addChild(cloud.cloudSprite);
  //     else backgroundCanvas.stage.addChild(cloud.cloudSprite);
  //     if (cloud.debugRect && SPRITE_DEBUG_ON) forgroundCanvas.stage.addChild(cloud.debugRect);
  //   });

  // addCursors(forgroundCanvas.stage);

  let frameCount = 0;
  let resizeCount = -1;
  Ticker.shared.add((delta) => {
    frameCount++;
    updateDisplayVariables(delta);
    // updateCursors(delta);
    if (WINDOW_SIZE_CHANGED) resizeCount = 90;
    else if (resizeCount > 0) {
      resizeCount--;
    } else if (resizeCount == 0) {
      resizeCount = -1;
      onResize();
    }

    if (!bgSplitPoints || SCROLL_CHANGED || WINDOW_SIZE_CHANGED) {
      bgSplitPoints = updateBackgrounds(delta);
    }
    updateSpacerClouds(bgSplitPoints, scrollY);
    updateClouds(delta, bgSplitPoints, globalScaling);
  });

  const onResize = () => {
    globalScaling = Math.max(Math.min(window.innerWidth / 1920, window.innerHeight / 1080), 0.7);
    forgroundCanvas.renderer.resize(window.innerWidth, window.innerHeight);
    backgroundCanvas.renderer.resize(window.innerWidth, window.innerHeight);
  };
  onResize();

  onMount(() => {
    (forgroundCanvas.view as HTMLCanvasElement).classList.add("forground", "hidden");
    (backgroundCanvas.view as HTMLCanvasElement).classList.add("background", "hidden");
    document.body.appendChild(forgroundCanvas.view as HTMLCanvasElement);
    document.body.appendChild(backgroundCanvas.view as HTMLCanvasElement);
    setTimeout(() => {
      (forgroundCanvas.view as HTMLCanvasElement).classList.remove("hidden");
      (backgroundCanvas.view as HTMLCanvasElement).classList.remove("hidden");
    }, 100);
  });

  afterUpdate(() => {});

  onDestroy(() => {
    // Remove canvas on unmount
    forgroundCanvas.destroy(true);
    backgroundCanvas.destroy(true);
  });
</script>
