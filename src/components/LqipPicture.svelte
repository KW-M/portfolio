<script lang="ts">
  import { attachZoom } from "./ImageZoom.action";

  export let picture: { alt?: string; src: string; width: number; height: number; lqip: string };
  export let loadHiRez: boolean = false;
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

<picture style={`background-image: url(${picture.lqip}); background-size:cover`} class="blurable" class:blur={!loaded}>
  <!-- <source srcset={shouldLoad ? picture.src : ""} /> -->
  <img
    class={$$props.class + " pic"}
    src={shouldLoad ? picture.src : ""}
    loading="lazy"
    class:loaded
    alt={picture.alt || ""}
    width={picture.width || ""}
    height={picture.height || ""}
    on:load={() => {
      loadedOnce = true;
      console.log((loaded = true));
    }}
  />
</picture>

<style>
  .pic {
    transition: opacity ease-in 0.6s;
    transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    opacity: 0;
  }
  .pic.loaded {
    /* transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1); */
    opacity: 1;
  }

  .blurable {
    transition: filter linear 0.6s;
    filter: blur(0);
  }

  .blur {
    filter: blur(4px);
  }
</style>
