<script lang="ts">
  // core version + navigation, pagination modules:
  import Swiper from "swiper";
  import { FreeMode, Keyboard } from "swiper/modules";
  // import Swiper and modules styles
  import "swiper/css";
  //   import "swiper/css/navigation";
  //   import "swiper/css/pagination";

  import { setContext, onDestroy, onMount } from "svelte";
  import LqipPicture from "./LqipPicture.svelte";
  import LqipVideo from "./LqipVideo.svelte";
  import { previewZoomOpen } from "../actions/ImageZoom.action";

  const i18nDefaults = { carousel: "carousel", counter: "%s of %s", first: "Go to the first slide", last: "Go to the last slide", next: "Go to the next slide", play: "Start autoplay", prev: "Return back to previous slide", slide: "slide", slideN: "Go to the slide %s", stop: "Stop autoplay" };
  const format = (str: string, ...r: any) => {
    for (let t of r) str = str.replace("%s", t.toString());
    return str;
  };
  const i18n = i18nDefaults;
  setContext("i18n", i18n);

  $$props.class = "";
  const yPadding = 18;
  export let slides: carouselMediaInfo[] = [];
  export let index = 0;
  export let enabled = false;
  export let loadHiRez = false;
  export let mounted = false;
  $: length = slides.length;
  $: scale = 1;

  let slideHeight = 0;
  let zoomedSlide = -1;
  let forceUpdate = false;
  let renderCarousel = false;
  let transitionTimeout: number;
  $: if (enabled) {
    renderCarousel = true;
  } else {
    clearTimeout(transitionTimeout);
    transitionTimeout = window.setTimeout(() => {
      if (!enabled) renderCarousel = false;
    }, 1000);
  }

  function next() {
    if (previewZoomOpen.get()) return;
    index++;
  }

  function prev() {
    if (previewZoomOpen.get()) return;
    index--;
  }

  function onIndexChange(e: CustomEvent<{ index: number }>) {
    index = e.detail.index;
    console.log("i", index);
  }

  let swiper: Swiper;
  onMount(() => {
    // window.addEventListener("resize", onResize);

    // init Swiper:
    swiper = new Swiper(".swiper", {
      // configure Swiper to use modules
      modules: [FreeMode, Keyboard],
      slidesPerView: "auto",
      centeredSlides: true,
      loop: true,
      loopAdditionalSlides: 2,
      grabCursor: true,
      spaceBetween: 30,
      freeMode: {
        enabled: true,
        sticky: true,
        momentumRatio: 0.1,
        minimumVelocity: 0.1,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
    });
  });

  onDestroy(() => {});
</script>

<!-- <div bind:this={root} class={"snap-carousel-container " + $$props.class}>
  <slot />
</div> -->

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- style={`height: ${slideHeight + yPadding * 2}px;padding-top:${yPadding}px;transform: translateY(${enabled ? 0 : -slideHeight - yPadding * 2 + scale * slideHeight}px) scale(${scale})`} -->
<section aria-roledescription={i18n.carousel} aria-orientation="horizontal" class={"swiper"} class:cardTransition={renderCarousel}>
  <!--
      on:destroy
      on:index
      on:move
      on:resize
      on:update
      on:keys
    -->
  <ol class="swiper-wrapper" aria-live="polite" role="listbox" tabindex="0">
    {#each slides as item, i}
      {@const active = i === index}
      {@const visible = i === index || i === index - 1 || i === (index + 1) % slides.length}
      {@const zoomed = i === zoomedSlide}
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <!-- style={`height: ${slideHeight}px; width: ${slideHeight * (item.width / item.height)}px`} -->
      <li aria-current={active ? "true" : undefined} data-index={i} aria-label={format(i18n.counter, i, length)} aria-roledescription={i18n.slide} class="swiper-slide" class:active role="group" on:mousedown={(e) => console.log(e, i)}>
        {#if item.type === "img"}
          <LqipPicture picture={item} class={"rounded-none w-auto h-full"} loadHiRez={true} zoomed={false} />
        {:else if item.type === "video"}
          <LqipVideo video={item} class={"rounded-none w-auto  h-full"} loadHiRez={true} zoomed={false} />
        {/if}
      </li>
    {/each}
  </ol>

  <!-- <button class="btn-icon btn-icon-xl shadow-lg variant-filled-primary arrow-btn left-4" on:click={prev}>(</button>
  <button class="btn-icon btn-icon-xl shadow-lg variant-filled-primary arrow-btn right-4" on:click={next}>)</button> -->
</section>

<style>
  .arrow-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    cursor: pointer;
  }

  li.fake-active {
    position: absolute;
    top: 50%;
    z-index: 10;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .swiper {
    position: relative;
    height: 352px;
    overflow: hidden;
    overscroll-behavior: contain;
    user-select: none;
    cursor: grab;
    -webkit-user-select: none;
    transform-origin: center bottom;
    @apply block border-t-8 border-b-8 border-transparent border-solid;
  }

  .swiper.cardTransition {
    transition: transform 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  .swiper-wrapper {
    min-height: 0;
    position: relative;
    white-space: nowrap;
    width: 100%;
    height: 100%;
    max-width: 100%;
    list-style: none;
    display: block;
    /* justify-content: left; */
  }

  .swiper-slide {
    display: inline-block;

    height: 100%;
    @apply relative overflow-hidden rounded-xl bg-cover w-auto;
  }

  .slides-placeholder {
    transform: translateX(-50%);
    filter: blur(5px);
    @apply block rounded-xl absolute top-4 z-50 bottom-4 left-1/2 bg-cover bg-no-repeat;
  }
</style>
