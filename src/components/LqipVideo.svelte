<script lang="ts">
  import { onMount } from "svelte";
  import { attachZoom, previewZoomOpen } from "../actions/ImageZoom.action";
  import { staticIndex } from "./LqipPicture.svelte";
  import { ProgressRing } from "@skeletonlabs/skeleton-svelte";
  import { IconExpandOut } from "$lib/assets";
  export let video: { type: "video"; title?: string; formats: { src: string; type: string }[]; src: string; width: number; height: number; lqip: string };
  export let loadHiRez: boolean = true;
  export let onClick = () => true;
  export let isCentered: boolean = false;
  $: if (isCentered && videoElement && videoElement.paused) videoElement.play();
  $: if (!isCentered && videoElement && !videoElement.paused) videoElement.pause();
  // };
  // export const onCarouselClick = () => {
  //   console.log("clicked");
  //   if (videoElement && videoElement.paused) videoElement.play();
  //   else {
  //     zoomed = !zoomed;
  //   }
  // };
  let zoomed = false;
  let loaded: boolean = true;
  let playing: boolean = false;
  let hovered: boolean = false;
  let focused: boolean = false;
  let mounted: boolean = false;
  let videoElement: HTMLVideoElement;

  const onmouseenter = () => (hovered = true);
  const onmouseleave = () => (hovered = false);
  const onclickcapture = (e) => {
    if (videoElement && videoElement.paused) {
      videoElement.play();
      return onClick();
    }
    if (onClick() && !videoElement.paused) {
      zoomed = !zoomed;
    }
    e.stopImmediatePropagation();
    e.preventDefault();
  };

  staticIndex.update((n) => n + 1);
  const instanceNum = staticIndex.get();
  onMount(() => (mounted = true));
  $: if (!$previewZoomOpen) zoomed = false;
</script>

<div class="h-full relative bg-black cursor-zoom-in rounded-xl overflow-hidden" style={`aspect-ratio: ${video.width}/${video.height}`}>
  <figure use:attachZoom={{ zoomed, width: video.width, height: video.height }} style={`background-image: url(${video.lqip}); aspect-ratio: ${video.width}/${video.height}; animation-delay: ${-instanceNum * 500}ms;`} class="blurable rounded-xl overflow-hidden block h-full bg-cover relative animate-pulse" class:blur={!loaded} class:animate-pulse={!loaded} {onmouseenter} {onmouseleave}>
    <!-- <button
      class="w-full h-full"
      aria-label={"zoom video " + video.title || ""}
      on:click={(e) => {
        console.log("clickd", e);
        // e.stopImmediatePropagation();
        if (videoElement && videoElement.paused) {
          videoElement.play();
          return onClick();
        }
        if (onClick() && !videoElement.paused) zoomed = !zoomed;
      }}
    > -->
    {#if mounted && (loadHiRez || loaded)}
      <video
        poster={video.src || ""}
        width={video.width || ""}
        height={video.height || ""}
        title={video.title || ""}
        class={$$props.class}
        class:pic={true}
        {onclickcapture}
        class:zoomed
        loop
        autoplay
        muted
        defaultmuted
        playsinline
        bind:this={videoElement}
        oncanplay={(e) => {
          // e.currentTarget.play();
          loaded = true;
        }}
        onplay={(e) => {
          playing = true;
          // if (!loaded) {
          //   // e.currentTarget.controls = false;
          //   // e.currentTarget.attributes.removeNamedItem("controls");
          //   // console.log("loadedvideo", video.title, e.currentTarget);
          // }
        }}
        onpause={(e) => {
          playing = false;
        }}
      >
        {#each video.formats as fmt}
          <source src={fmt.src} type={fmt.type} />
        {/each}
      </video>
    {/if}
    <!-- </button> -->
    {#if video.title && video.title != ""}
      <figcaption class="backdrop-blur-md bg-surface-50/60 text-surface-contrast-50 dark:bg-surface-950/60 dark:text-surface-contrast-950 py-2 px-3 absolute bottom-0 w-full transition-transform whitespace-nowrap translate-y-full" class:translate-y-0={hovered || focused} {onclickcapture}>
        <!-- <button class="inline-block size-12 overflow-hidden">▶</button> -->
        <span class="inline-block" class:text-base={zoomed}>{video.title}</span>
      </figcaption>
    {/if}
    {#if loaded && !zoomed}
      <button
        onclick={() => {
          if (onClick()) zoomed = !zoomed;
        }}
        tabindex="-1"
        aria-hidden="true"
        class="absolute top-4 right-4 btn opacity-0 btn-icon-lg bg-surface-50/60 backdrop-blur-md text-surface-contrast-50 dark:bg-surface-950/60 dark:text-surface-contrast-950 z-10"
        class:opacity-100={hovered || focused}
      >
        <IconExpandOut class="size-7 mx-auto" />
      </button>
    {/if}
    {#if !loaded}
      <ProgressRing value={null} size="size-14" meterStroke="stroke-tertiary-600-400" trackStroke="stroke-tertiary-50-950" classes="!absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none" />
    {/if}
  </figure>
</div>

<style>
  .pic {
    /* transition: opacity ease-in 0.6s;
    transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    opacity: 0;
    width: 100%; */
    @apply w-full;
  }
  .pic.loaded {
    opacity: 1;
  }

  .pic.zoomed {
    opacity: 1;
    cursor: zoom-out;
  }

  .blurable {
    transition: filter linear 0.6s;
    filter: blur(0);
  }

  .blur {
    filter: blur(4px);
  }

  figure:hover figcaption,
  figure:focus figcaption {
    --tw-translate-y: 0;
  }

  figure:hover .zoom-icon-btn,
  figure:focus .zoom-icon-btn {
    opacity: 1;
  }
</style>
