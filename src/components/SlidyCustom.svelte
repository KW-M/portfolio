<script lang="ts">
  import { slidy, type SlidyInstance } from "@slidy/core";
  import { onDestroy, onMount } from "svelte";

  export let enabled = true;
  export let animation = void 0;
  export let axis = "x";
  export let clamp = 0;
  export let className = "";
  export let duration = 450;
  export let easing = (t: number) => t;
  export let gravity = 1.2;
  export let indent = 2;
  export let index = 0;
  export let loop = false;
  export let sensity = 5;
  export let snap = void 0;

  let slidyElem: HTMLOListElement;
  let s: SlidyInstance;

  let initilized = false;
  $: initilized && (enabled ? init() : deInit());

  const indexEventListener = (e: { detail: { index: number } }) => (index = e.detail.index);
  function init() {
    if (!s)
      s = slidy(slidyElem, {
        animation,

        //@ts-ignore
        axis,
        clamp,
        duration,
        easing,
        gravity,
        indent,
        index,
        loop,
        sensity,
        snap,
      });
    else s.init(slidyElem);
    //@ts-ignore
    slidyElem.addEventListener("index", indexEventListener);
  }

  function deInit() {
    if (!s) return;
    s.destroy();
    //@ts-ignore
    slidyElem.removeEventListener("index", indexEventListener);
  }

  onMount(() => {
    index = 1;
    // if (enabled) {
    //   init();
    // }
    initilized = true;
    setInterval(() => {
      index++;
    }, 1000);
  });

  onDestroy(() => {
    deInit();
  });
</script>

<ol class={className} aria-live="polite" role="listbox" tabindex="0" bind:this={slidyElem}>
  <slot />
</ol>

<!--   use:action={{
    animation,
    // @ts-ignore
    axis,
    clamp,
    duration,
    easing,
    gravity,
    indent,
    index,
    loop,
    sensity,
    snap,
  }}
  on:destroy
  on:index
  on:index={(e) => (index = e.detail.index)}
  on:keys
  on:mount
  on:move
  on:move={(e) => (position = e.detail.position)}
  on:resize
  on:update -->
