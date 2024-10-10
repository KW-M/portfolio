<script lang="ts" context="module">
  import nStore from "$lib/libraries/nStore";
  import { onMount } from "svelte";
  export let staticIndex = nStore(0);
</script>

<script lang="ts">
  import { attachZoom, previewZoomOpen } from "../actions/ImageZoom.action";
  import { crossfade } from "svelte/transition";
  import { IconExpandOut } from "$lib/assets";
  import { ProgressRing } from "@skeletonlabs/skeleton-svelte";
  export let picture: { alt?: string; src: string; width: number; height: number; lqip: string };
  export let loadHiRez: boolean = false;
  export let onClick = () => true;
  let zoomed = false;
  let loaded: boolean = false;
  let mounted: boolean = false;
  let rounded: boolean = true;
  crossfade;
  staticIndex.update((n) => n + 1);
  const instanceNum = staticIndex.get();
  onMount(() => (mounted = true));
  $: if (!$previewZoomOpen) zoomed = false;
</script>

<div class="h-full relative bg-black cursor-zoom-in overflow-clip" class:rounded-xl={rounded} style={`aspect-ratio: ${picture.width}/${picture.height}`}>
  <figure use:attachZoom={{ zoomed, width: picture.width, height: picture.height }} style={`aspect-ratio: ${picture.width}/${picture.height};`} class=" overflow-hidden block h-full max-w-full relative" class:rounded-xl={rounded}>
    <button
      style={`background-image: url(${picture.lqip});animation-delay: ${-instanceNum * 500}ms;`}
      class="max-w-full w-full h-full blurable bg-cover"
      class:blur={!loaded}
      class:animate-pulse={!loaded}
      aria-label={"zoom image " + (picture.alt || "")}
      on:click={() => {
        if (onClick()) zoomed = !zoomed;
      }}
    >
      {#if mounted && (loadHiRez || loaded)}
        <img class={$$props.class} class:pic={true} class:loaded on:load={() => (loaded = true)} src={picture.src} alt={picture.alt} width={picture.width} height={picture.height} />
      {/if}
    </button>
    {#if picture.alt}
      <figcaption class="backdrop-blur-md transition-transform translate-y-full bg-surface-50/60 text-surface-contrast-50 dark:bg-surface-950/60 dark:text-surface-contrast-950 py-2 px-3 absolute bottom-0 w-full max-w-full">{@html picture.alt}</figcaption>
    {/if}
    {#if loaded && !zoomed}
      <button
        on:click={() => {
          onClick();
          zoomed = !zoomed;
        }}
        tabindex="-1"
        aria-hidden="true"
        class="zoom-icon-btn absolute top-4 right-4 btn opacity-0 btn-icon-lg bg-surface-50/60 backdrop-blur-md text-surface-contrast-50 dark:bg-surface-950/60 dark:text-surface-contrast-950 z-10"><IconExpandOut class="size-7 mx-auto" /></button
      >
    {/if}
    {#if !loaded}
      <ProgressRing value={null} size="size-14" meterStroke="stroke-tertiary-600-400" trackStroke="stroke-tertiary-50-950" classes="!absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none" />
    {/if}
  </figure>
</div>

<style>
  .pic {
    transition: opacity ease-in 0.6s;
    transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    opacity: 0;
    pointer-events: none;
  }

  .pic.loaded {
    opacity: 1;
  }

  .pic.zoomed {
    opacity: 1;
    pointer-events: none;
  }

  .blurable {
    transition: filter linear 0.6s;
    filter: blur(0);
    animation-duration: 4000ms;
  }

  .blur {
    filter: blur(4px);
  }

  figure:hover figcaption,
  figure button:focus + figcaption {
    --tw-translate-y: 0;
  }

  figure:hover .zoom-icon-btn,
  figure:focus .zoom-icon-btn {
    opacity: 1;
  }
  /*
  figcaption {
    background-color: #222;
    color: #fff;
    font: italic smaller sans-serif;
    padding: 3px;
    text-align: center;
  } */
</style>
