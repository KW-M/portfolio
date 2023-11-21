<script lang="ts">
  import { onMount, onDestroy, afterUpdate } from "svelte";
  import { Application, Assets, Sprite, Ticker, Color, Rectangle, Graphics, NineSlicePlane } from "pixi.js";
  import { pickRandom } from "$lib/util";
  import { bgScreenspace, updateBackgrounds } from "$lib/bgCalc";
  import { addCloud, clouds, greyscaleTintSprite, updateClouds } from "$lib/cloudCalc";
  import { backgrounds, baseClouds } from "$lib/assets";

  const forgroundCanvas = new Application({
    backgroundAlpha: 0,
    resizeTo: window,
  });

  const backgroundCanvas = new Application({
    backgroundAlpha: 1,
    resizeTo: window,
  });

  let backgroundSprites = backgrounds.map((bg) => {
    const sp = Sprite.from(bg);
    backgroundCanvas.stage.addChild(sp);
    return sp;
  });

  const g = new Graphics();
  g.lineStyle(4, 0xf0f0f0, 0.9);
  g.drawRoundedRect(0, 0, 100, 100, 5);
  g.endFill();
  const debugRectTexture = forgroundCanvas.renderer.generateTexture(g);
  g.destroy();

  for (let i = 0; i < 55; i++) {
    const rec = new NineSlicePlane(debugRectTexture, 5, 5, 5, 5);
    const sp = Sprite.from(pickRandom(baseClouds));
    const x = (Math.random() - 0.25) * window.innerWidth * 2;
    const y = Math.random() * window.innerHeight * 5;
    const z = Math.random() * 1600 + 100;
    sp.anchor.set(0.6 - z / 1700 / 4);
    sp.alpha = 0.6;
    greyscaleTintSprite(sp, Math.random() * 0x20 + 0xdf);
    addCloud(sp, x, y, z, rec);
  }

  //sort by z
  clouds
    .sort((a, b) => {
      return b.z - a.z;
    })
    .forEach((cloud) => {
      cloud.cloudSprite.zIndex = 2000 - cloud.z;
      if (cloud.z < 600) forgroundCanvas.stage.addChild(cloud.cloudSprite);
      else backgroundCanvas.stage.addChild(cloud.cloudSprite);
      if (cloud.debugRect) backgroundCanvas.stage.addChild(cloud.debugRect);
    });

  const cloudCount = 10;
  const cloudSpeed = 6;

  Ticker.shared.add((delta) => {
    const bgSplitPoint = updateBackgrounds(backgroundSprites, backgroundCanvas.stage);
    updateClouds(delta, bgSplitPoint);
  });

  window.addEventListener("resize", () => {
    const bgSplitPoint = updateBackgrounds(backgroundSprites, backgroundCanvas.stage);

    // app.renderer.resize(window.innerWidth, window.innerHeight);
  });

  onMount(() => {
    (forgroundCanvas.view as HTMLCanvasElement).classList.add("forground");
    (backgroundCanvas.view as HTMLCanvasElement).classList.add("background");
    document.body.appendChild(forgroundCanvas.view as HTMLCanvasElement);
    document.body.appendChild(backgroundCanvas.view as HTMLCanvasElement);
  });

  afterUpdate(() => {});

  onDestroy(() => {
    // Remove canvas on unmount
    forgroundCanvas.destroy(true);
    backgroundCanvas.destroy(true);
  });
</script>

<style>
  :global(canvas) {
    background-attachment: fixed;
    background-position: 50% 50%;
    background-size: cover;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }
  :global(.background) {
    z-index: 0;
  }
  :global(.midground) {
    z-index: 3;
  }
  :global(.forground) {
    z-index: 5;
  }
</style>
