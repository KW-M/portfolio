<script lang="ts">
  import type { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
  import emblaCarouselSvelte from "embla-carousel-svelte";
  import EmblaClassNames from "embla-carousel-class-names";
  import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
  import LqipPicture from "./LqipPicture.svelte";
  import LqipVideo from "./LqipVideo.svelte";
  import { previewZoomOpen } from "../actions/ImageZoom.action";
  import { onDestroy } from "svelte";
  import { navIcons } from "$lib/assets";

  $$props.class = "";
  const yPadding = 18;
  export let slides: carouselMediaInfo[] = [];
  //   export let index = 0;
  //   export let enabled = false;
  //   export let loadHiRez = false;
  //   export let mounted = false;
  $: length = slides.length;
  let zoomedSlide = -1;
  let mounted = false;

  const i18nDefaults = { carousel: "carousel", counter: "%s of %s", first: "Go to the first slide", last: "Go to the last slide", next: "Go to the next slide", play: "Start autoplay", prev: "Return back to previous slide", slide: "slide", slideN: "Go to the slide %s", stop: "Stop autoplay" };
  const format = (str: string, ...r: any) => {
    for (let t of r) str = str.replace("%s", t.toString());
    return str;
  };
  const i18n = i18nDefaults;

  let emblaApi: EmblaCarouselType;

  $: if (!$previewZoomOpen) zoomedSlide = -1;

  function next() {
    if (previewZoomOpen.get()) return;
    emblaApi.scrollNext();
  }

  function prev() {
    if (previewZoomOpen.get()) return;
    emblaApi.scrollPrev();
  }

  function onSlideClick(clickIndex: number) {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    console.log("click slide", clickIndex, index, zoomedSlide);
    if (index === clickIndex) {
      zoomedSlide = clickIndex;
    } else {
      emblaApi.scrollTo(clickIndex);
    }
  }

  function emblaInit(evt: CustomEvent<EmblaCarouselType>) {
    console.log(navIcons.back);
    emblaApi = evt.detail;
    // emblaApi.on("select", console.log);
    mounted = true;
  }

  let options: EmblaOptionsType = {
    loop: true,
    watchResize: true,
    align: "center",
    watchSlides: false,
  };
  let plugins = [
    // Autoplay(),
    EmblaClassNames({
      draggable: "embla__dragable",
      dragging: "embla__dragging",
      active: true,
    }),
    WheelGesturesPlugin({
      forceWheelAxis: "x",
    }),
  ];

  onDestroy(() => {
    if (emblaApi) emblaApi.destroy();
  });
</script>

<section class="embla" use:emblaCarouselSvelte={{ options, plugins }} on:emblaInit={emblaInit} class:invisible={!mounted}>
  <ol class="embla__container" aria-live="polite" role="listbox" tabindex="0">
    {#each slides as item, i}
      {#if item != null}
        {@const zoomed = i === zoomedSlide}
        <li class="embla__slide embla__class-names" data-index={i} aria-label={format(i18n.counter, i, length)} aria-roledescription={i18n.slide} role="group">
          {#if item.type === "img"}
            <LqipPicture picture={item} class={"rounded-none w-auto h-full embla__slide__img"} loadHiRez={true} {zoomed} />
          {:else if item.type === "video"}
            <LqipVideo video={item} class={"rounded-none w-auto h-full embla__slide__img"} loadHiRez={true} {zoomed} />
          {/if}
          <button on:click={() => onSlideClick(i)} aria-current={true ? "true" : undefined} class="hidden absolute inset-0 transition-opacity duration-300 delay-700 opacity-0 hover:opacity-100 bg-slate-900/70 text-white text-5xl expand-button bg-center bg-no-repeat" style={`background-image:url('${navIcons.fullscreen}')`}></button>
        </li>
      {/if}
    {/each}
  </ol>
  <button class="btn-icon btn-icon-lg preset-filled-secondary-500 shadow-lg variant-filled-primary embla__btn left-4" on:click={prev} style={`background-image:url('${navIcons.back}')`}></button>
  <button class="btn-icon btn-icon-lg preset-filled-secondary-500 shadow-lg variant-filled-primary embla__btn right-4" on:click={next} style={`background-image:url('${navIcons.forward}')`}></button>
</section>

<style>
  .embla {
    /* --slide-height: 352px; */

    --slide-spacing: 1rem;
    --slide-size: 70%;
    position: relative;
    overflow: hidden;
    box-sizing: content-box;
    border-bottom: 18px solid transparent;
    border-top: 18px solid transparent;
    @apply h-44 md:h-80 lg:h-96;
  }
  .embla__container {
    display: flex;
    touch-action: pan-y pinch-zoom;
    margin-left: calc(var(--slide-spacing) * -1);
    overscroll-behavior: contain;
    user-select: none;
  }
  .embla__slide {
    transform: translate3d(0, 0, 0);
    flex: 1 0 auto;
    margin-left: var(--slide-spacing);
    @apply overflow-hidden rounded-xl h-44 md:h-80 lg:h-96;
  }
  .embla__slide {
    transition: opacity 0.2s ease-in-out;
  }
  .embla__slide {
    opacity: 1;
  }
  :global(.embla__dragable) {
    cursor: pointer;
  }
  :global(.embla__dragging) {
    cursor: grabbing;
  }
  :global(.embla__slide.is-snapped) {
    opacity: 1;
  }
  :global(.embla__slide.is-snapped button) {
    display: block;
  }
  .embla__btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    background-size: 32px;
    @apply bg-no-repeat bg-center;
  }

  .expand-button {
    background-size: 68px;
  }
</style>
