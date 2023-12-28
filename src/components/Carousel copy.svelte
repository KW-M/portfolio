<!-- <script lang="ts">
  import { onDestroy, onMount } from "svelte";

  export let interactive = false;
  export let numItems = 0;
  let root: HTMLDivElement;
  let dragToScroll: any;
  let activeSnap: any;

  const getActiveIndex = () => activeSnap.activeSnapIndex;

  function next() {
    const index = (getActiveIndex() + 1) % numItems;
    scrollTo({ index, root });
  }

  function prev() {
    const index = (getActiveIndex() - 1 + numItems) % numItems;
    scrollTo({ index, root });
  }

  function cleanupEvents() {
    if (!dragToScroll || !activeSnap) return;
    dragToScroll.disable();
    activeSnap.destroy();
  }

  function addEvents() {
    if (!dragToScroll || !activeSnap) return;
    dragToScroll.enable();
    activeSnap.init();
  }

  $: interactive ? addEvents() : cleanupEvents();

  onMount(() => {
    dragToScroll = _dragToScroll({ root });
    activeSnap = new ActiveSnap({
      root: root,
      onChange: console.log,
    });
    if (!interactive) cleanupEvents();
  });
  onDestroy(cleanupEvents);
</script>

<div bind:this={root} class={"snap-carousel-container " + $$props.class}>
  <slot />
</div>

<button on:click={prev}>Previous</button>
<button on:click={next}>Next</button> -->

<script>
  import { backgrounds } from "$lib/assets";
  import { Slidy, classNames } from "@slidy/svelte";
  import { flip } from "@slidy/animation";

  const slides = backgrounds.map((background, i) => {
    return {
      id: i,
      src: background,
    };
  });
</script>

<Slidy
  {slides}
  loop={true}
  arrows={true}
  axis="x"
  counter={false}
  snap="center"
  gap={0}
  animation={flip}
  classNames={{
    ...classNames,
    slides: classNames.slides + " !py-4 ",
    root: classNames.root + " !h-96",
  }}
/>

<style>
  /* .slidy-slides {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .slidy-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .slidy-slide img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  } */
</style>
