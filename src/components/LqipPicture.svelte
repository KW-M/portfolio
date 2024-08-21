<script lang="ts" context="module">
  import nStore from "$lib/libraries/nStore";
  import { onMount } from "svelte";
  export let staticIndex = nStore(0);
</script>

<script lang="ts">
  import { attachZoom, previewZoomOpen } from "../actions/ImageZoom.action";
  import { crossfade } from "svelte/transition";
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
  <figure use:attachZoom={{ zoomed, width: picture.width, height: picture.height }} style={`background-image: url(${picture.lqip}); aspect-ratio: ${picture.width}/${picture.height}; animation-delay: ${-instanceNum * 500}ms;`} class="blurable overflow-clip block h-full max-w-full bg-cover relative animate-pulse" class:rounded-xl={rounded} class:blur={!loaded} class:animate-pulse={!loaded}>
    <button
      class="max-w-full h-full"
      aria-label={"zoom image " + (picture.alt || "")}
      on:click={() => {
        if (onClick()) zoomed = !zoomed;
        console.log("clicked", zoomed);
      }}
    >
      {#if mounted && (loadHiRez || loaded)}
        <img class={$$props.class} class:pic={true} class:loaded on:load={() => (loaded = true)} src={picture.src} alt={picture.alt} width={picture.width} height={picture.height} />
      {/if}
    </button>
    {#if picture.alt}
      <figcaption class="bg-surface-950/80 text-surface-contrast-950 py-2 px-3 absolute bottom-0 w-full max-w-full opacity-0">{picture.alt}</figcaption>
    {/if}
  </figure>
  {#if !loaded}
    <!-- <ProgressRing value={undefined} size="size-14" meterStroke="stroke-tertiary-600-400" trackStroke="stroke-tertiary-50-950" classes="!absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2" /> -->
  {/if}
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

  figure:hover figcaption {
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
