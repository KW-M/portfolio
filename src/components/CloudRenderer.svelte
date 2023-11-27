<script lang="ts">
  import { onMount, onDestroy, afterUpdate } from "svelte";
  import { Application, Assets, Sprite, Ticker, Color, Rectangle, Graphics, NineSlicePlane, TilingSprite } from "pixi.js";
  import { pickRandom } from "$lib/util";
  import { bgScreenspace, bgSplitSprites, updateBackgrounds } from "$lib/bgCalc";
  import { addCloud, addCoverCloud, clouds, coverClouds, greyscaleTintSprite, placeSplitpointCloud, placeUniformCloud, updateClouds } from "$lib/cloudCalc";
  import { backgrounds, baseClouds, bigClouds, blendGradient9SliceArgs, blendGradientTexture } from "$lib/assets";
  import { PERSPECTIVE } from "$lib/consts";
  import { calcOffsetBetweenLayers, screenspaceToWorldspace, worldspaceToScreenspace } from "$lib/3dCalc";

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

  for (let i = 0; i < 4; i++) {
    const splitSprite = new NineSlicePlane(blendGradientTexture, ...blendGradient9SliceArgs);
    backgroundCanvas.stage.addChild(splitSprite);
    splitSprite.zIndex = -1;
    // splitSprite.tint =
    bgSplitSprites.push(splitSprite); //0x3f3f3f; //0x8f8f8f; // 0xEFEFEF;
  }

  let globalScaling = 1;

  const onResize = () => {
    globalScaling = Math.max(Math.min(window.innerWidth / 1920, window.innerHeight / 1080), 0.7);
    // forgroundCanvas.renderer.resize(window.innerWidth, window.innerHeight);
    // backgroundCanvas.renderer.resize(window.innerWidth, window.innerHeight);
    const bgSplitPoint = updateBackgrounds(backgroundSprites, backgroundCanvas.stage);
  };
  onResize();
  window.addEventListener("resize", onResize);

  const g = new Graphics();
  g.lineStyle(4, 0xf0f0f0, 0.9);
  g.beginFill(0x000000, 0.5);
  g.drawRoundedRect(0, 0, 100, 100, 5);
  g.endFill();
  const debugRectTexture = forgroundCanvas.renderer.generateTexture(g);
  g.destroy();

  for (let i = 0; i < 18; i++) {
    const rec = new NineSlicePlane(debugRectTexture, 5, 5, 5, 5);
    const sp = Sprite.from(pickRandom(baseClouds));
    const x = Math.random() * window.innerWidth * 181;
    const y = Math.random() * window.innerHeight * 181;
    const z = Math.random() * 1600 + 200;
    const reverseScale = 1;
    sp.alpha = 1;
    sp.renderable = false;
    greyscaleTintSprite(sp, Math.random() * 50 + 205);
    addCloud(sp, x, y, z, 2, 0.6, rec, globalScaling);
  }

  for (let i = 0; i < 60; i++) {
    const rec = new NineSlicePlane(debugRectTexture, 5, 5, 5, 5);
    const sp = TilingSprite.from(bigClouds[0], { width: 2049, height: 1152 });
    const z = Math.abs(i % 2) * 100 + 900;
    const cloudHeight = 1152;
    const reverseScale = (globalScaling * (((PERSPECTIVE + z) / PERSPECTIVE) * cloudHeight)) / sp.height;
    const alpha = (sp.alpha = 1);
    sp.renderable = false;
    greyscaleTintSprite(sp, Math.random() * 0x20 + 0xdf);
    addCoverCloud(sp, 0, -1000000, z, reverseScale / globalScaling, alpha, rec, globalScaling);
  }

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

  //sort by z
  clouds
    .sort((a, b) => {
      return b.startPos.z - a.startPos.z;
    })
    .forEach((cloud) => {
      cloud.cloudSprite.zIndex = 4000 - cloud.startPos.z;
      if (cloud.startPos.z < 200) forgroundCanvas.stage.addChild(cloud.cloudSprite);
      else backgroundCanvas.stage.addChild(cloud.cloudSprite);
      // if (cloud.debugRect) forgroundCanvas.stage.addChild(cloud.debugRect);
    });

  coverClouds
    .sort((a, b) => {
      return b.startPos.z - a.startPos.z;
    })
    .forEach((cloud) => {
      cloud.cloudSprite.zIndex = 2000 - cloud.startPos.z;
      backgroundCanvas.stage.addChild(cloud.cloudSprite);
      if (cloud.debugRect) forgroundCanvas.stage.addChild(cloud.debugRect);
    });

  const cloudCount = 10;
  const cloudSpeed = 6;
  let cloudAdded = false;
  let debugTick: NineSlicePlane;

  const calcDistanceAcrossZ = (distance: number, zFrom: number, zTo: number) => {
    const scale1 = PERSPECTIVE / (PERSPECTIVE + zFrom);
    const scale2 = PERSPECTIVE / (PERSPECTIVE + zTo);
    return distance * (scale1 / scale2) + (scrollY * (-scale1 + scale2)) / scale2;
  };

  Ticker.shared.add((delta) => {
    const bgSplitPoint = updateBackgrounds(backgroundSprites, backgroundCanvas.stage);
    updateClouds(delta, bgSplitPoint, globalScaling);
    const bgScale = PERSPECTIVE / (PERSPECTIVE + 2000);
    const mdScale = PERSPECTIVE / (PERSPECTIVE + 1000);

    // const yShift = calcDistanceAcrossZ(bgSplitPoint[0], 2000, 2000);
    // let { y: ya } = worldspaceToScreenspace({ x: 0, y: bgSplitPoint[0], z: 2000 }, scrollY);
    // ({ y: ya } = screenspaceToWorldspace({ x: 0, y: ya, z: 2000 }, scrollY));
    // let { y } = screenspaceToWorldspace({ x: 0, y: window.innerHeight, z: 2000 }, scrollY);
    const splitPointHeight = 200 * bgScale;
    const yStart = calcOffsetBetweenLayers(bgSplitPoint[1], window.innerHeight + 250, window.innerHeight, 2000, 1000);
    const yEnd = calcOffsetBetweenLayers(bgSplitPoint[1], -50, 0, 2000, 1000);

    if (debugTick) debugTick.y = (yStart - scrollY) * mdScale;
    if (cloudAdded) return;
    cloudAdded = true;
    debugTick = new NineSlicePlane(debugRectTexture, 5, 5, 5, 5);
    debugTick.width = 100;
    debugTick.height = (yEnd - yStart) * mdScale;
    debugTick.x = 100;

    forgroundCanvas.stage.addChild(debugTick);
    // for (let i = 6; i > 0; i--) {
    //   const rec = new NineSlicePlane(debugRectTexture, 5, 5, 5, 5);
    //   const sp = Sprite.from(bigClouds[0]);
    //   const z = 0; //i * 80;
    //   const x = i * 200;
    //   // let { y } = // placeSplitpointCloud(bgSplitPoint, 200, 2000, z);
    //   let y = bgSplitPoint[0];
    //   console.log(y, z);
    //   const alpha = (sp.alpha = 1);
    //   greyscaleTintSprite(sp, (z * 255) / 480);
    //   addCloud(sp, x, y * 2, z, 0.2, alpha, rec, globalScaling);
    //   forgroundCanvas.stage.addChild(rec);
    // }
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
