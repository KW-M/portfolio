<script lang="ts">
  import { attachZoom } from "../actions/ImageZoom.action";

  export let video: { type: "video"; title?: string; formats: { src: string; type: string }[]; src: string; width: number; height: number; lqip: string };
  export let loadHiRez: boolean = false;
  export let zoomed = false;
  let shouldLoad = false;
  let loaded: boolean = false;
  let loadedOnce: boolean = false;

  $: if (loadHiRez) {
    shouldLoad = true;
  } else {
    loaded = false;
    setTimeout(() => {
      if (!loadHiRez) shouldLoad = false;
      else if (loadedOnce) loaded = true;
    }, 600);
  }
</script>

<figure style={`background-image: url(${video.lqip}); background-size:cover; aspect-ratio: ${video.width} / ${video.height}`} class={$$props.class + " blurable"} class:blur={!loaded} class:invisible={zoomed}>
  {#if shouldLoad}
    <video
      use:attachZoom={{ zoomed, width: video.width, height: video.height }}
      on:zoomClose={() => {
        zoomed = false;
      }}
      width={video.width || ""}
      height={video.height || ""}
      class=" pic"
      class:loaded
      class:zoomed
      title={video.title || ""}
      poster={shouldLoad ? video.src : ""}
      loop
      autoplay
      muted
      playsinline
      on:canplay={(e) => {
        loadedOnce = true;
        loaded = true;
        e.currentTarget.play();
      }}
    >
      {#each video.formats as fmt}
        <source src={fmt.src} type={fmt.type} />
      {/each}
    </video>
  {/if}
</figure>

<style>
  .pic {
    transition: opacity ease-in 0.6s;
    transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    opacity: 0;
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
</style>
