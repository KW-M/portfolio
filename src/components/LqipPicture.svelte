<script lang="ts">
  import { attachZoom } from "../actions/ImageZoom.action";

  export let picture: { alt?: string; src: string; width: number; height: number; lqip: string };
  export let loadHiRez: boolean = false;
  export let zoomed = false;
  let shouldLoad = false;
  let loaded: boolean = false;
  let loadedOnce: boolean = false;

  $: if (loadHiRez) {
    shouldLoad = true;
  } else {
    zoomed = false;
    loaded = false;
    setTimeout(() => {
      if (!loadHiRez) shouldLoad = false;
      else if (loadedOnce) loaded = true;
    }, 600);
  }
</script>

<picture style={`background-image: url(${picture.lqip}); aspect-ratio: ${picture.width}/${picture.height}`} class="blurable block h-full bg-cover" class:blur={!loaded} class:invisible={zoomed}>
  <!-- <source srcset={shouldLoad ? picture.src : ""} /> -->
  <img
    style={`background-image: url(${picture.lqip}); background-size:cover`}
    use:attachZoom={{
      zoomed,
      width: picture.width,
      height: picture.height,
    }}
    on:zoomClose={() => {
      zoomed = false;
    }}
    class={$$props.class + " pic "}
    src={shouldLoad ? picture.src : ""}
    class:loaded
    class:zoomed
    alt={picture.alt || ""}
    width={picture.width || ""}
    height={picture.height || ""}
    on:load={() => {
      loadedOnce = true;
      loaded = true;
    }}
  />
</picture>

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
  }

  .blur {
    filter: blur(4px);
  }
</style>
