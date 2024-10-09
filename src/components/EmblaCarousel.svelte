<script lang="ts">
  import type { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
  import emblaCarouselSvelte from "embla-carousel-svelte";
  import EmblaClassNames from "embla-carousel-class-names";
  import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
  import LqipPicture from "./LqipPicture.svelte";
  import LqipVideo from "./LqipVideo.svelte";
  import { onDestroy } from "svelte";
  import { navIcons } from "$lib/assets";
  import { disableBrowserBackSwipe } from "$lib/globals";

  $$props.class = "";
  const yPadding = 18;
  export let color = "bg-slate-900";
  export let slides: carouselMediaInfo[] = [];
  //   export let index = 0;
  //   export let enabled = false;
  //   export let loadHiRez = false;
  //   export let mounted = false;
  $: length = slides.length;
  let zoomedSlide = -1;
  let centerSlide = -1;
  let mounted = false;

  const i18nDefaults = { carousel: "carousel", counter: "%s of %s", first: "Go to the first slide", last: "Go to the last slide", next: "Go to the next slide", play: "Start autoplay", prev: "Return back to previous slide", slide: "slide", slideN: "Go to the slide %s", stop: "Stop autoplay" };
  const format = (str: string, ...r: any) => {
    for (let t of r) str = str.replace("%s", t.toString());
    return str;
  };
  const i18n = i18nDefaults;

  let emblaApi: EmblaCarouselType;
  let limboContainer: HTMLElement;

  function next() {
    emblaApi.scrollNext();
  }

  function prev() {
    emblaApi.scrollPrev();
  }

  function onSlideClick(clickIndex: number) {
    if (!emblaApi) return false;
    const index = emblaApi.selectedScrollSnap();
    if (index === clickIndex) {
      return true;
    } else {
      emblaApi.scrollTo(clickIndex);
      return false;
    }
  }

  function emblaInit(evt: CustomEvent<EmblaCarouselType>) {
    emblaApi = evt.detail;
    emblaApi.on("select", () => {
      centerSlide = emblaApi.selectedScrollSnap();
    });
    mounted = true;
  }

  let options: EmblaOptionsType = {
    loop: true,
    watchResize: true,
    align: "center",
    watchSlides: false,
    containScroll: "keepSnaps",
  };
  let plugins = [
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

<!-- <Limbo bind:component={limboContainer}> -->
<!-- class:invisible={!mounted} -->
<section class="embla" class:embla__fullscreen={false} use:emblaCarouselSvelte={{ options, plugins }} on:emblaInit={emblaInit}>
  <ol class="embla__container" aria-live="polite" role="listbox" tabindex="0" on:mouseenter={() => disableBrowserBackSwipe.set(true)} on:mouseleave={() => disableBrowserBackSwipe.set(true)}>
    {#each slides as item, i}
      {#if item != null}
        <li class="embla__slide embla__class-names" data-index={i} aria-label={format(i18n.counter, i, length)} aria-roledescription={i18n.slide} role="group">
          {#if item.type === "img"}
            <LqipPicture picture={item} class={"w-auto h-full embla__slide__img"} loadHiRez={mounted} onClick={() => onSlideClick(i)} />
          {:else if item.type === "video"}
            <LqipVideo video={item} class={"w-auto h-full embla__slide__img"} loadHiRez={mounted} isCentered={centerSlide === i} onClick={() => onSlideClick(i)} />
          {/if}
          <!-- <button on:click={() => onSlideClick(i)} aria-current={true ? "true" : undefined} class="hidden absolute inset-0 transition-opacity duration-300 delay-700 opacity-0 hover:opacity-100 bg-slate-900/70 text-white text-5xl expand-button bg-center bg-no-repeat" style={`background-image:url('${navIcons.fullscreen}')`}></button> -->
        </li>
      {/if}
    {/each}
  </ol>
  <button class={"btn-icon btn-icon-lg shadow-lg embla__btn left-4 " + color} on:click={prev} style={`background-image:url('${navIcons.back}')`} aria-label="previous photo"></button>
  <button class={"btn-icon btn-icon-lg shadow-lg embla__btn right-4 " + color} on:click={next} style={`background-image:url('${navIcons.forward}')`} aria-label="next photo"></button>
</section>

<!-- </Limbo> -->

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
    /* margin-left: calc(var(--slide-spacing) * -1); */
    overscroll-behavior: contain;
    user-select: none;
    @apply h-full;
  }
  .embla__slide {
    transform: translate3d(0, 0, 0);
    flex: 1 0 auto;
    margin-left: var(--slide-spacing);
    /* margin-right: var(--slide-spacing); */
    @apply h-full;
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

  .embla.embla__fullscreen {
    @apply fixed inset-0 h-full w-full z-50 border-0;
  }

  .embla.embla__fullscreen .embla__slide {
    @apply h-full;
  }

  :global(.embla.embla__fullscreen .embla__slide > div) {
    @apply scale-95;
  }

  /* .expand-button {
    background-size: 68px;
  } */
</style>
